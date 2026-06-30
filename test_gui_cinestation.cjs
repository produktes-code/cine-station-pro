const WebSocket = require('ws');
const http = require('http');
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const cspDmgBinary = "/Applications/CineStation Pro.app/Contents/MacOS/CineStation Pro";
const screenshotDir = "/Users/jesusferrer/.gemini/antigravity-ide/brain/d27311a1-cb99-4496-ac59-686965090a9c/docs/screenshots_verification_csp";

fs.mkdirSync(screenshotDir, { recursive: true });

function getWebSocketUrl() {
    return new Promise((resolve, reject) => {
        http.get('http://localhost:9223/json', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const targets = JSON.parse(data);
                    const pageTarget = targets.find(t => t.type === 'page');
                    if (pageTarget && pageTarget.webSocketDebuggerUrl) {
                        resolve(pageTarget.webSocketDebuggerUrl);
                    } else {
                        reject(new Error("No active page target found"));
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

function runCdpSession(wsUrl) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(wsUrl);
        let cmdId = 1;
        const pendingRequests = new Map();

        ws.on('open', async () => {
            console.log("CDP WebSocket connection opened.");
            try {
                await sendCommand('Page.enable');
                await sendCommand('DOM.enable');
                
                // Verify signature in footer
                const footerText = await evaluate("document.querySelector('footer') ? document.querySelector('footer').innerText : 'No footer'");
                console.log("Footer text detected:", footerText);
                const hasSignature = footerText.toLowerCase().includes("produktes-code");
                console.log("Footer signature check:", hasSignature ? "PASS" : "FAIL");

                // Cycle through all 7 languages
                const languages = ['es', 'en', 'de', 'ru', 'ja', 'uk', 'zh'];
                for (const lang of languages) {
                    console.log(`Switching language to: ${lang.toUpperCase()}`);
                    await evaluate(`
                        (function() {
                            const selectEl = Array.from(document.querySelectorAll('select')).find(s => s.querySelector('option[value="es"]'));
                            if (selectEl) {
                                selectEl.value = '${lang}';
                                selectEl.dispatchEvent(new Event('change', { bubbles: true }));
                            }
                        })()
                    `);
                    await new Promise(r => setTimeout(r, 1000));
                    const screenshotPath = path.join(screenshotDir, `language-${lang}.png`);
                    await captureScreenshot(screenshotPath);
                    console.log(`Captured screenshot for ${lang}`);
                }

                // Set to Ukrainian for persistence test
                console.log("Setting language to UK (Ukrainian) for persistence test...");
                await evaluate(`
                    (function() {
                        const selectEl = Array.from(document.querySelectorAll('select')).find(s => s.querySelector('option[value="es"]'));
                        if (selectEl) {
                            selectEl.value = 'uk';
                            selectEl.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    })()
                `);
                await new Promise(r => setTimeout(r, 1000));
                await captureScreenshot(path.join(screenshotDir, "persistence-before.png"));

                ws.close();
                resolve({ hasSignature });
            } catch (e) {
                reject(e);
            }
        });

        ws.on('message', (message) => {
            const response = JSON.parse(message);
            if (pendingRequests.has(response.id)) {
                const { resolve, reject } = pendingRequests.get(response.id);
                pendingRequests.delete(response.id);
                if (response.error) {
                    reject(new Error(response.error.message));
                } else {
                    resolve(response.result);
                }
            }
        });

        ws.on('error', reject);

        function sendCommand(method, params = {}) {
            return new Promise((res, rej) => {
                const id = ++cmdId;
                pendingRequests.set(id, { resolve: res, reject: rej });
                ws.send(JSON.stringify({ id, method, params }));
            });
        }

        async function evaluate(expression) {
            const result = await sendCommand('Runtime.evaluate', { expression, returnByValue: true });
            if (result.exceptionDetails) {
                throw new Error("JS Exception: " + result.exceptionDetails.exception.description);
            }
            return result.result.value;
        }

        async function captureScreenshot(filePath) {
            const result = await sendCommand('Page.captureScreenshot', { format: 'png' });
            const buffer = Buffer.from(result.data, 'base64');
            fs.writeFileSync(filePath, buffer);
        }
    });
}

function runEditorFlow(wsUrl) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(wsUrl);
        let cmdId = 1;
        const pendingRequests = new Map();

        ws.on('open', async () => {
            console.log("CDP WebSocket connection for editor flow opened.");
            try {
                await sendCommand('Page.enable');
                await sendCommand('DOM.enable');
                
                // Get current language
                const currentLang = await evaluate(`
                    (function() {
                        const selectEl = Array.from(document.querySelectorAll('select')).find(s => s.querySelector('option[value="es"]'));
                        return selectEl ? selectEl.value : null;
                    })()
                `);
                console.log("Loaded language after restart:", currentLang);
                const persistencePass = (currentLang === 'uk');
                console.log("Language persistence test:", persistencePass ? "PASS" : "FAIL");
                await captureScreenshot(path.join(screenshotDir, "persistence-after.png"));

                // Click the v2v engine mode button
                console.log("Switching engine mode to Video-to-Video (v2v)...");
                await evaluate(`
                    (function() {
                        const buttons = Array.from(document.querySelectorAll('button'));
                        const v2vBtn = buttons.find(b => b.innerText && b.innerText.includes('V2V'));
                        if (v2vBtn) {
                            v2vBtn.click();
                        } else {
                            console.error("v2v button not found!");
                        }
                    })()
                `);
                
                // Wait for file input to appear in DOM
                console.log("Waiting for file input to appear in DOM...");
                let inputExists = false;
                for (let i = 0; i < 15; i++) {
                    inputExists = await evaluate("!!document.querySelector('input[type=\"file\"]')");
                    if (inputExists) break;
                    await new Promise(r => setTimeout(r, 500));
                }
                
                if (!inputExists) {
                    throw new Error("Timeout waiting for file input element to render in v2v mode");
                }

                // Upload test video using DOM domain
                const videoFilePath = "/Users/jesusferrer/Desktop/test_video.mp4";
                console.log(`Uploading video via DOM: ${videoFilePath}`);
                const doc = await sendCommand('DOM.getDocument');
                const node = await sendCommand('DOM.querySelector', { nodeId: doc.root.nodeId, selector: 'input[type="file"]' });
                await sendCommand('DOM.setFileInputFiles', { nodeId: node.nodeId, files: [videoFilePath] });
                
                // Manually trigger change event so React picks up the video upload
                await evaluate(`
                    (function() {
                        const input = document.querySelector('input[type="file"]');
                        if (input) {
                            input.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    })()
                `);

                console.log("Waiting for video upload to finish...");
                await new Promise(r => setTimeout(r, 4000));

                // Select a style LUT target using React native setter
                console.log("Selecting style transfer target...");
                await evaluate(`
                    (function() {
                        const selectStyle = document.querySelector('select#v2v_style');
                        if (selectStyle && selectStyle.options.length > 1) {
                            const nativeSelectSetter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set;
                            nativeSelectSetter.call(selectStyle, selectStyle.options[1].value);
                            selectStyle.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    })()
                `);
                await new Promise(r => setTimeout(r, 500));

                // Input Visual prompt directive using React native setter
                console.log("Setting visual prompt directive text...");
                await evaluate(`
                    (function() {
                        const textarea = document.querySelector('textarea');
                        if (textarea) {
                            const nativeTextareaSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
                            nativeTextareaSetter.call(textarea, 'A beautiful cinematic clip with style transfer applied');
                            textarea.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                    })()
                `);
                await new Promise(r => setTimeout(r, 1000));

                // Click Compile Sequence (first button inside section)
                console.log("Clicking 'Compile Sequence' button...");
                await evaluate(`
                    (function() {
                        const compileBtn = document.querySelector('section button');
                        if (compileBtn) {
                            console.log("Found compile button inside section!");
                            compileBtn.click();
                        } else {
                            console.error("Compile button not found inside section!");
                        }
                    })()
                `);

                console.log("Waiting for video render job to complete (max 45 seconds)...");
                let renderPass = false;
                for (let i = 0; i < 45; i++) {
                    await new Promise(r => setTimeout(r, 1000));
                    const hasPre = await evaluate("!!document.querySelector('pre')");
                    if (hasPre) {
                        console.log("Found compiled payload output metadata <pre> block!");
                        renderPass = true;
                        break;
                    }
                    // Print logs from DOM if available
                    const terminalText = await evaluate(`
                        (function() {
                            const section = document.querySelector('section');
                            return section ? section.innerText : '';
                        })()
                    `);
                    if (terminalText && (terminalText.includes("SUCCESS") || terminalText.includes("complete") || terminalText.includes("УСПІШНО") || terminalText.includes("завершено"))) {
                        console.log("Found successful compilation log in UI terminal!");
                        renderPass = true;
                        break;
                    }
                }

                console.log("Render completed state:", renderPass ? "PASS" : "FAIL");
                await captureScreenshot(path.join(screenshotDir, "processing_success.png"));

                ws.close();
                resolve({ persistencePass, renderPass });
            } catch (e) {
                reject(e);
            }
        });

        ws.on('message', (message) => {
            const response = JSON.parse(message);
            if (pendingRequests.has(response.id)) {
                const { resolve, reject } = pendingRequests.get(response.id);
                pendingRequests.delete(response.id);
                if (response.error) {
                    reject(new Error(response.error.message));
                } else {
                    resolve(response.result);
                }
            }
        });

        ws.on('error', reject);

        function sendCommand(method, params = {}) {
            return new Promise((res, rej) => {
                const id = ++cmdId;
                pendingRequests.set(id, { resolve: res, reject: rej });
                ws.send(JSON.stringify({ id, method, params }));
            });
        }

        async function evaluate(expression) {
            const result = await sendCommand('Runtime.evaluate', { expression, returnByValue: true });
            if (result.exceptionDetails) {
                throw new Error("JS Exception: " + result.exceptionDetails.exception.description);
            }
            return result.result.value;
        }

        async function captureScreenshot(filePath) {
            const result = await sendCommand('Page.captureScreenshot', { format: 'png' });
            const buffer = Buffer.from(result.data, 'base64');
            fs.writeFileSync(filePath, buffer);
        }
    });
}

async function main() {
    let wsUrl;
    try {
        wsUrl = await getWebSocketUrl();
    } catch (e) {
        console.error("DevTools port 9223 not reachable:", e.message);
        process.exit(1);
    }

    console.log("Starting Phase 1 (Languages & Signature)...");
    const { hasSignature } = await runCdpSession(wsUrl);

    console.log("Killing and waiting for port release (5 seconds)...");
    execSync('killall "CineStation Pro" 2>/dev/null || true');
    await new Promise(r => setTimeout(r, 5000));

    console.log("Reopening CineStation Pro...");
    const appProcess = spawn(cspDmgBinary, ["--remote-debugging-port=9223"], {
        detached: true
    });
    
    appProcess.stdout.on('data', (data) => {
        console.log(`[App restart stdout]: ${data.toString().trim()}`);
    });
    appProcess.stderr.on('data', (data) => {
        console.error(`[App restart stderr]: ${data.toString().trim()}`);
    });
    
    appProcess.unref();
    await new Promise(r => setTimeout(r, 7000));

    const newWsUrl = await getWebSocketUrl();
    console.log("Starting Phase 2 (Persistence & Editor Flow)...");
    const { persistencePass, renderPass } = await runEditorFlow(newWsUrl);

    console.log("Cleaning up processes...");
    execSync('killall "CineStation Pro" 2>/dev/null || true');

    const overallPass = hasSignature && persistencePass && renderPass;
    console.log("\n====================================");
    console.log("T2_SMOKE_TEST_CSP:", overallPass ? "PASS" : "FAIL");
    console.log("Details:");
    console.log("  - Signature in Footer: ", hasSignature ? "PASS" : "FAIL");
    console.log("  - Language Persistence (UK): ", persistencePass ? "PASS" : "FAIL");
    console.log("  - Editor Compile & Render: ", renderPass ? "PASS" : "FAIL");
    console.log("====================================");

    process.exit(overallPass ? 0 : 1);
}

main().catch(console.error);
