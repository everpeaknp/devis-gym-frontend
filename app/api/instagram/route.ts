import { NextResponse } from 'next/server';

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  media_type: string;
  timestamp: string;
}

export async function GET() {
  try {
    // Instagram public data extraction approach
    // Note: This is a simplified approach - Instagram actively blocks scraping
    const username = 'devisgym_pokhara';
    
    // Method 1: Try Instagram's public endpoints (may not work due to restrictions)
    const instagramUrl = `https://www.instagram.com/${username}/`;
    
    const response = await fetch(instagramUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
      },
    });

    if (!response.ok) {
      throw new Error(`Instagram request failed: ${response.status}`);
    }

    const html = await response.text();
    
    // Extract JSON data from Instagram's page
    const jsonMatch = html.match(/window\._sharedData = ({.*?});/);
    
    if (jsonMatch) {
      const sharedData = JSON.parse(jsonMatch[1]);
      const user = sharedData?.entry_data?.ProfilePage?.[0]?.graphql?.user;
      
      if (user?.edge_owner_to_timeline_media?.edges) {
        const posts = user.edge_owner_to_timeline_media.edges.map((edge: any) => ({
          id: edge.node.id,
          media_url: edge.node.display_url,
          permalink: `https://www.instagram.com/p/${edge.node.shortcode}/`,
          caption: edge.node.edge_media_to_caption.edges[0]?.node.text || '',
          media_type: edge.node.__typename === 'GraphVideo' ? 'VIDEO' : 'IMAGE',
          timestamp: new Date(edge.node.taken_at_timestamp * 1000).toISOString(),
          likes: edge.node.edge_liked_by.count,
          comments: edge.node.edge_media_to_comment.count,
        }));

        return NextResponse.json({ 
          success: true, 
          posts: posts.slice(0, 7),
          source: 'instagram_scrape'
        });
      }
    }

    // Fallback: Return mock data if scraping fails
    return NextResponse.json({
      success: true,
      posts: [
        {
          id: "1",
          media_url: "/gallery/gym-1.jpeg",
          permalink: "https://www.instagram.com/devisgym_pokhara/",
          caption: "Welcome to Devi's Gym Pokhara! 💪 #DevisGym #PokharaFitness",
          media_type: "IMAGE",
          timestamp: new Date().toISOString(),
          likes: 145,
          comments: 23
        },
        {
          id: "2",
          media_url: "/gallery/gym-2.jpeg", 
          permalink: "https://www.instagram.com/devisgym_pokhara/",
          caption: "State-of-the-art equipment for your fitness journey 🏋️‍♂️",
          media_type: "IMAGE",
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          likes: 89,
          comments: 12
        },
        {
          id: "3",
          media_url: "/gallery/gym-3.jpeg",
          permalink: "https://www.instagram.com/devisgym_pokhara/", 
          caption: "Personal training sessions available. Book yours today! 🔥",
          media_type: "IMAGE",
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          likes: 156,
          comments: 31
        },
        {
          id: "4",
          media_url: "/gallery/training-1.jpeg",
          permalink: "https://www.instagram.com/devisgym_pokhara/",
          caption: "Group fitness classes - energy and motivation combined! 🎯",
          media_type: "IMAGE", 
          timestamp: new Date(Date.now() - 259200000).toISOString(),
          likes: 203,
          comments: 18
        },
        {
          id: "5",
          media_url: "/gallery/training-2.jpeg",
          permalink: "https://www.instagram.com/devisgym_pokhara/",
          caption: "Clean, modern facilities in the heart of Pokhara 🏢",
          media_type: "IMAGE",
          timestamp: new Date(Date.now() - 345600000).toISOString(),
          likes: 178,
          comments: 24
        },
        {
          id: "6", 
          media_url: "/gallery/people-1.jpeg",
          permalink: "https://www.instagram.com/devisgym_pokhara/",
          caption: "Transform your body, transform your life. Join us! 💯",
          media_type: "IMAGE",
          timestamp: new Date(Date.now() - 432000000).toISOString(),
          likes: 134,
          comments: 19
        },
        {
          id: "7", 
          media_url: "/gallery/lifestyle-1.jpeg",
          permalink: "https://www.instagram.com/devisgym_pokhara/",
          caption: "Lifestyle transformation starts here. Be the best version of yourself! ✨ #Transformation",
          media_type: "IMAGE",
          timestamp: new Date(Date.now() - 518400000).toISOString(),
          likes: 167,
          comments: 28
        }
      ],
      source: 'fallback',
      message: 'Using fallback data - Instagram scraping may be blocked'
    });

  } catch (error) {
    console.error('Instagram fetch error:', error);
    
    // Return fallback data on error
    return NextResponse.json({
      success: true,
      posts: [
        {
          id: "fallback-1",
          media_url: "/gallery/gym-1.jpeg",
          permalink: "https://www.instagram.com/devisgym_pokhara/",
          caption: "Devi's Gym Pokhara - Your fitness destination! 💪",
          media_type: "IMAGE",
          timestamp: new Date().toISOString(),
          likes: 125,
          comments: 15
        }
      ],
      source: 'error_fallback',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}