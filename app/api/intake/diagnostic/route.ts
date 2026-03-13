import { handleIntakeRoute } from "@/lib/intake-route-handler";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleIntakeRoute(request, "diagnostic");
}
