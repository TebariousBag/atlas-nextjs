import { fetchTopics } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const topics = await fetchTopics();
    
    const topicsJson = topics.map(topic => ({
      id: topic.id,
      title: topic.title
    }));
    
    return NextResponse.json(topicsJson);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}
