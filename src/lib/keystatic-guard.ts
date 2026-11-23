import { storage } from "../../keystatic.config";

/**
 * Le mode "local" de Keystatic écrit directement sur le disque, sans authentification.
 * Il ne doit exister qu'en développement. En ligne, seul le mode "github" (connexion GitHub) est servi.
 */
export const keystaticEnabled = storage.kind === "github" || process.env.NODE_ENV === "development";
