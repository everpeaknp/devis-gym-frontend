import requests
from bs4 import BeautifulSoup
import json
import re

def extract_facebook_images(facebook_url):
    """
    Extract image URLs from a Facebook page
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(facebook_url, headers=headers)
        response.raise_for_status()
        
        # Parse the HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all image tags
        images = []
        
        # Method 1: Look for img tags
        for img in soup.find_all('img'):
            src = img.get('src')
            if src and 'scontent' in src:  # Facebook CDN images
                images.append({
                    'url': src,
                    'alt': img.get('alt', 'Gym photo')
                })
        
        # Method 2: Look for background images in style attributes
        for elem in soup.find_all(style=re.compile(r'background-image')):
            style = elem.get('style', '')
            urls = re.findall(r'url\(["\']?(.*?)["\']?\)', style)
            for url in urls:
                if 'scontent' in url:
                    images.append({
                        'url': url,
                        'alt': 'Gym photo'
                    })
        
        # Remove duplicates
        seen = set()
        unique_images = []
        for img in images:
            if img['url'] not in seen:
                seen.add(img['url'])
                unique_images.append(img)
        
        return unique_images
    
    except Exception as e:
        print(f"Error extracting images: {e}")
        return []

def categorize_images(images):
    """
    Categorize images based on keywords (basic implementation)
    You can manually adjust the categories after extraction
    """
    categorized = []
    categories = ['Gym', 'Training', 'People', 'Lifestyle']
    
    for i, img in enumerate(images):
        # Simple rotation through categories for now
        category = categories[i % len(categories)]
        
        categorized.append({
            'id': f'g{i+1}',
            'category': category,
            'src': img['url'],
            'alt': f"Devi's Gym - {img['alt']}",
            'available': True
        })
    
    return categorized

def generate_gallery_data(images):
    """
    Generate TypeScript data file content
    """
    ts_content = """export type GalleryCategory = "Gym" | "People" | "Training" | "Lifestyle";

export type GalleryImage = {
  id: string;
  category: GalleryCategory;
  src: string;
  alt: string;
  available: boolean;
};

export const galleryImages: GalleryImage[] = [
"""
    
    for img in images:
        ts_content += f'  {{ id: "{img["id"]}", category: "{img["category"]}", src: "{img["src"]}", alt: "{img["alt"]}", available: {str(img["available"]).lower()} }},\n'
    
    ts_content += """];

export const galleryCategories: GalleryCategory[] = [
  "Gym",
  "People",
  "Training",
  "Lifestyle",
];
"""
    
    return ts_content

if __name__ == "__main__":
    # Facebook page URL
    facebook_url = "https://www.facebook.com/DevisGym/photos"
    
    print("Extracting images from Facebook...")
    images = extract_facebook_images(facebook_url)
    
    print(f"Found {len(images)} images")
    
    if images:
        # Categorize images
        categorized = categorize_images(images[:12])  # Take first 12 images
        
        # Generate TypeScript file
        ts_content = generate_gallery_data(categorized)
        
        # Save to file
        with open('gallery_data.ts', 'w', encoding='utf-8') as f:
            f.write(ts_content)
        
        print("Gallery data saved to gallery_data.ts")
        
        # Also print JSON for inspection
        print("\nExtracted images (JSON):")
        print(json.dumps(categorized, indent=2))
    else:
        print("No images found. Facebook might require login or the page structure has changed.")
        print("\nNote: Facebook makes it difficult to scrape without authentication.")
        print("Please provide image URLs manually or use Facebook's Graph API with proper authentication.")
