import wasm from "./Cargo.toml";
import './style/style.css';

async function main() {
    const exports = await wasm();
    exports.run_app();
}
main()