import { prisma } from "@/lib/prisma";
import { type NextRequest } from "next/server";
export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ status: string }> }
) {
  const status = (await params).status;
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const take = searchParams.get("take") || "20";
  const videos = await prisma.video.findMany({
    where: { status },
    orderBy: { finishedAt: "desc" },
    skip: (parseInt(page) - 1) * parseInt(take),
    take: parseInt(take),
  });
  return Response.json({
    data: videos,
    code: 200,
    status: "success",
  });
}
