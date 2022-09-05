/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_PORT: string;
	readonly VITE_POLL_RATE: string;
	readonly VITE_LOCAL_COMPUTER_IP: string;
	readonly VITE_MPC_PORT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
