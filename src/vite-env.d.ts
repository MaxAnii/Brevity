/// <reference types="vite/client" />
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SUMMERIZE_TOKEN: string;
		}
	}
}
