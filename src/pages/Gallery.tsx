import { useState } from 'react';
import ReactPlayer from 'react-player';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

let galleryItems = [
  {
    id: 1,
    title: 'Education Program Activities',
    category: 'education',
    date: '2025',
    description: 'Students engaged in various educational activities',
    image: '/images/IMG-20250123-WA0146.jpg',
  },
  {
    id: 2,
    title: 'Community Outreach',
    category: 'events',
    date: '2025',
    description: 'Community engagement and support activities',
    image: '/images/IMG-20250123-WA0145.jpg',
  },
  {
    id: 3,
    title: 'Student Support Programs',
    category: 'education',
    date: '2025',
    description: 'Supporting students in their educational journey',
    image: '/images/IMG-20250123-WA0144.jpg',
  },
  {
    id: 4,
    title: 'Agricultural Projects',
    category: 'farming',
    date: '2025',
    description: 'Sustainable farming initiatives',
    image: '/images/IMG-20250123-WA0143.jpg',
  },
  {
    id: 5,
    title: 'Volunteer Activities',
    category: 'volunteers',
    date: '2025',
    description: 'International volunteers making a difference',
    image: '/images/IMG-20250123-WA0142.jpg',
  },
  {
    id: 6,
    title: 'Community Events',
    category: 'events',
    date: '2025',
    description: 'Bringing the community together',
    image: '/images/IMG-20250123-WA0141.jpg',
  },
  {
    id: 7,
    title: 'School Programs',
    category: 'education',
    date: '2025',
    description: 'Educational programs in action',
    image: '/images/IMG-20250123-WA0140.jpg',
  },
  {
    id: 8,
    title: 'Development Projects',
    category: 'projects',
    date: '2025',
    description: 'Infrastructure and development initiatives',
    image: '/images/IMG-20250123-WA0139.jpg',
  },
  {
    id: 9,
    title: 'Student Activities',
    category: 'education',
    date: '2025',
    description: 'Students participating in various activities',
    image: '/images/IMG-20250123-WA0138.jpg',
  },
  {
    id: 10,
    title: 'Community Support',
    category: 'events',
    date: '2025',
    description: 'Supporting our local community',
    image: '/images/IMG-20250123-WA0137.jpg',
  },
  {
    id: 11,
    title: 'Farming Initiatives',
    category: 'farming',
    date: '2025',
    description: 'Sustainable agriculture projects',
    image: '/images/IMG-20250123-WA0136.jpg',
  },
  {
    id: 12,
    title: 'Volunteer Programs',
    category: 'volunteers',
    date: '2025',
    description: 'International volunteers in action',
    image: '/images/IMG-20250123-WA0135.jpg',
  },
  {
    id: 13,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/IMG-20250624-WA0017.jpg',
  },
  {
    id: 14,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/IMG-20250624-WA0018.jpg',
  },
  {
    id: 16,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/IMG-20250624-WA0020.jpg',
  },
  {
    id: 17,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/IMG-20250624-WA0021.jpg',
  },
  {
    id: 18,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/IMG-20250624-WA0022.jpg',
  },
  {
    id: 19,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/IMG-20250624-WA0023.jpg',
  },
  {
    id: 20,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/IMG-20250624-WA0024.jpg',
  },
  {
    id: 22,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/IMG-20250624-WA0026.jpg',
  },
  {
    id: 23,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/IMG-20250624-WA0027.jpg',
  },
  {
    id: 24,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/IMG-20250625-WA0001.jpg',
  },
  {
    id: 25,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/IMG-20250625-WA0002.jpg',
  },
  {
    id: 26,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/1.jpg',
  },
  {
    id: 27,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/2.jpg',
  },
  {
    id: 28,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/3.jpg',
  },
  {
    id: 29,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/4.jpg',
  },
  {
    id: 30,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/5.jpg',
  },
  {
    id: 31,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/images/6.jpg',
  },
  {
    id: 32,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/construction/8.jpg',
  },
  {
    id: 33,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/construction/9.jpg',
  },
  {
    id: 34,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/construction/10.jpg',
  },
  {
    id: 35,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/construction/11.jpg',
  },
  {
    id: 36,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/construction/12.jpg',
  },
  {
    id: 37,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/construction/13.jpg',
  },
  {
    id: 38,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/construction/14.jpg',
  },
  {
    id: 39,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/construction/15.jpg',
  },
  {
    id: 40,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/construction/16.jpg',
  },
  {
    id: 41,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/construction/17.jpg',
  },
  {
    id: 42,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/construction/18.jpg',
  },
  {
    id: 43,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/designs/1.jpg',
  },
  {
    id: 44,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/designs/2.jpg',
  },
  {
    id: 45,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/designs/3.jpg',
  },
  {
    id: 46,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/designs/4.jpg',
  },
  {
    id: 47,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/designs/5.jpg',
  },
  {
    id: 48,
    title: 'Community Moments',
    category: 'others',
    date: '2025',
    description: 'A moment from our community.',
    image: '/designs/6.jpg',
  },
];

const galleryItems_2 = Array.from({ length: 28 }, (_, index) => {
  const imageNumber = String(index + 1).padStart(5, '0');

  return {
    id: index + 1,
    title: index < 15 ? 'Education Program Activities' : 'Community Events',
    category: index < 15 ? 'education' : 'events',
    date: '2025',
    description:
      index < 15
        ? 'Students engaged in educational activities.'
        : 'Community engagement and event activities.',
    image: `/images/kcf-image-${imageNumber}.jpeg`,
  };
});

galleryItems = [...galleryItems, ...galleryItems_2];

function getYouTubeVideoId(url: string) {
  try {
    const parsed = new URL(url);

    // https://youtu.be/<id>
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1);
    }

    // https://youtube.com/watch?v=<id>
    const watchId = parsed.searchParams.get('v');
    if (watchId) {
      return watchId;
    }

    // https://youtube.com/shorts/<id>
    const shortsMatch = parsed.pathname.match(/^\/shorts\/([^/]+)/);
    if (shortsMatch) {
      return shortsMatch[1];
    }

    // https://youtube.com/embed/<id>
    const embedMatch = parsed.pathname.match(/^\/embed\/([^/]+)/);
    if (embedMatch) {
      return embedMatch[1];
    }

    return null;
  } catch {
    return null;
  }
}

// Function to get YouTube thumbnail URL
function getYouTubeThumbnail(url: string) {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
}

// Sample videos data - replace with actual video links
const videoItems = [
  {
    id: 1,
    title: 'New school plot showcase',
    description: 'Highlights for the New school plot showcase',
    url: 'https://youtube.com/shorts/TUXRciH3vrU?si=efoIU_dPowQXvfpQ',
  },
  {
    id: 2,
    title: 'Community video',
    description: "Watch a video from Kalikwani Children's Support Centre.",
    url: 'https://youtube.com/shorts/csmn_WKc12s?si=VPD7EZTpp9hwOAts',
  },
  {
    id: 3,
    title: 'Community update',
    description: "Watch a video from Kalikwani Children's Support Centre.",
    url: 'https://youtu.be/z-cRlhl3fIE?si=nYhE09axtowU0X_g',
  },
  {
    id: 4,
    title: '29 July 2026',
    description: "Watch a video from Kalikwani Children's Support Centre.",
    url: 'https://youtu.be/WFzVFVsBWFc?si=nV8xSE72PMPEOMKe',
  },
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'education', label: 'Education' },
  { value: 'farming', label: 'Farming Projects' },
  { value: 'volunteers', label: 'Volunteers' },
  { value: 'events', label: 'Events' },
  { value: 'projects', label: 'Projects' },
  { value: 'others', label: 'Others' },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredGallery = galleryItems.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (selectedYear !== 'all' && item.date !== selectedYear) {
      return false;
    }
    return true;
  });
  const visibleGallery = filteredGallery.slice(0, visibleCount);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-muted py-20 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-6">Gallery</h1>
          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
            Explore our journey through images, showcasing the impact of our programs and the
            stories of the children we support.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value);
                setVisibleCount(12);
              }}
            >
              <SelectTrigger
                aria-label="Filter gallery by category"
                className="w-full sm:w-[200px]"
              >
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedYear}
              onValueChange={(value) => {
                setSelectedYear(value);
                setVisibleCount(12);
              }}
            >
              <SelectTrigger aria-label="Filter gallery by year" className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedYear('all');
                setVisibleCount(12);
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleGallery.map((item, index) => (
              <figure
                key={`${item.image}-${index}`}
                className="overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_-26px_rgba(22,50,35,.5)]"
              >
                <img
                  src={item.image}
                  alt={item.description || item.title}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="p-5">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  <p className="mt-4 text-xs font-semibold text-primary">
                    {categories.find((category) => category.value === item.category)?.label} ·{' '}
                    {item.date}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
          {filteredGallery.length > visibleCount && (
            <div className="mt-10 text-center">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-7"
                onClick={() => setVisibleCount((count) => count + 12)}
              >
                Show more photos
              </Button>
              <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
                Showing {visibleGallery.length} of {filteredGallery.length} photos
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-12 bg-muted w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {videoItems.map((video) => (
              <div key={video.id} className="group relative">
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  {selectedVideo === video.id ? (
                    <ReactPlayer
                      url={video.url}
                      width="100%"
                      height="100%"
                      controls
                      playing={selectedVideo === video.id}
                    />
                  ) : (
                    <button
                      type="button"
                      aria-label={`Play ${video.title}`}
                      className="w-full h-full bg-cover bg-center cursor-pointer relative text-left"
                      style={{
                        backgroundImage: `url('${getYouTubeThumbnail(video.url)}')`,
                      }}
                      onClick={() => setSelectedVideo(video.id)}
                    >
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-primary translate-x-0.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="!text-white font-semibold mb-1">{video.title}</h3>
                        <p className="text-white/80 text-sm">{video.description}</p>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Empty State */}
      {filteredGallery.length === 0 && (
        <div className="py-20 text-center w-full">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-muted-foreground">
              No images found for the selected filters.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedYear('all');
                setVisibleCount(12);
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
