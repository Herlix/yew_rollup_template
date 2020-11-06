import wasm from "./Cargo.toml";

async function main() {
    const exports = await wasm();
    exports.run_app();
}
main()