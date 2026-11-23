import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";
import { keystaticEnabled } from "@/lib/keystatic-guard";

const handlers = keystaticEnabled ? makeRouteHandler({ config }) : null;
const notFound = () => new Response("Not Found", { status: 404 });

export const GET = handlers?.GET ?? notFound;
export const POST = handlers?.POST ?? notFound;
