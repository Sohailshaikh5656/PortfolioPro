const data = [
  {
    "title": "Modern Downtown Apartment",
    "type": "Apartment",
    "location": "123 Main Street, Downtown, NY 10001",
    "price": 2500,
    "short": "Luxury 2-bedroom apartment in heart of downtown",
    "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    "description": "Beautiful modern apartment featuring hardwood floors, stainless steel appliances, and stunning city views. Includes in-unit laundry and 24/7 concierge service.",
    "created_At": "2024-01-15T10:30:00Z",
    "updated_At": "2024-03-20T14:45:00Z"
  },
  {
    "title": "Suburban Family Home",
    "type": "House",
    "location": "456 Oak Avenue, Suburbia, CA 90210",
    "price": 450000,
    "short": "Spacious 4-bedroom family home with backyard",
    "image": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop",
    "description": "Perfect family home in quiet neighborhood featuring updated kitchen, large backyard, and excellent school district. Recently renovated with new roof and HVAC system.",
    "created_At": "2024-02-10T09:15:00Z",
    "updated_At": "2024-03-18T11:20:00Z"
  },
  {
    "title": "Lakeside Cabin Retreat",
    "type": "Cabin",
    "location": "789 Lakeview Road, Mountainville, CO 80435",
    "price": 1200,
    "short": "Cozy cabin with private lake access",
    "image": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
    "description": "Rustic yet modern cabin with direct lake access. Perfect for nature lovers with hiking trails, fishing, and stunning mountain views. Features wood fireplace and deck.",
    "created_At": "2024-01-22T13:45:00Z",
    "updated_At": "2024-03-22T16:30:00Z"
  },
  {
    "title": "Beachfront Condo",
    "type": "Condominium",
    "location": "321 Ocean Drive, Beach City, FL 33139",
    "price": 1800,
    "short": "Ocean view condo with beach access",
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    "description": "Stunning beachfront property with panoramic ocean views. Includes community pool, gym, and direct beach access. Recently updated with modern finishes.",
    "created_At": "2024-02-28T11:00:00Z",
    "updated_At": "2024-03-25T10:15:00Z"
  },
  {
    "title": "Urban Loft Studio",
    "type": "Studio",
    "location": "654 Industrial Way, Arts District, IL 60607",
    "price": 1500,
    "short": "Industrial loft in trendy arts district",
    "image": "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop",
    "description": "Converted industrial space with exposed brick, high ceilings, and large windows. Perfect for artists and young professionals in vibrant neighborhood.",
    "created_At": "2024-01-30T14:20:00Z",
    "updated_At": "2024-03-19T13:40:00Z"
  },
  {
    "title": "Mountain View Chalet",
    "type": "Chalet",
    "location": "555 Pine Trail, Aspen, CO 81611",
    "price": 320000,
    "short": "Ski-in/ski-out chalet with mountain views",
    "image": "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop",
    "description": "Luxurious mountain chalet with direct ski access. Features hot tub, stone fireplace, and floor-to-ceiling windows with breathtaking mountain panoramas.",
    "created_At": "2024-02-05T08:45:00Z",
    "updated_At": "2024-03-21T15:10:00Z"
  },
  {
    "title": "City Center Penthouse",
    "type": "Penthouse",
    "location": "777 Skyline Blvd, Manhattan, NY 10016",
    "price": 8500,
    "short": "Luxury penthouse with rooftop terrace",
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
    "description": "Exclusive penthouse featuring private rooftop terrace, chef's kitchen, and panoramic city views. Includes valet parking and private elevator access.",
    "created_At": "2024-01-18T16:30:00Z",
    "updated_At": "2024-03-24T09:25:00Z"
  },
  {
    "title": "Garden Cottage",
    "type": "Cottage",
    "location": "888 Rose Lane, Charleston, SC 29401",
    "price": 280000,
    "short": "Charming historic cottage with garden",
    "image": "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&h=400&fit=crop",
    "description": "Historic cottage completely restored with modern amenities. Features original hardwood floors, wrap-around porch, and beautifully landscaped garden.",
    "created_At": "2024-02-14T12:15:00Z",
    "updated_At": "2024-03-23T14:50:00Z"
  },
  {
    "title": "Executive Townhouse",
    "type": "Townhouse",
    "location": "999 Corporate Drive, Boston, MA 02108",
    "price": 620000,
    "short": "Modern townhouse in financial district",
    "image": "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&h=400&fit=crop",
    "description": "Sophisticated townhouse with smart home features, private garage, and rooftop deck. Perfect for professionals seeking urban convenience with privacy.",
    "created_At": "2024-01-25T10:50:00Z",
    "updated_At": "2024-03-17T11:35:00Z"
  },
  {
    "title": "Desert Modern Villa",
    "type": "Villa",
    "location": "111 Cactus Road, Scottsdale, AZ 85255",
    "price": 890000,
    "short": "Minimalist villa with pool in desert landscape",
    "image": "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop",
    "description": "Architectural masterpiece featuring clean lines, infinity pool, and seamless indoor-outdoor living. Surrounded by native desert landscaping.",
    "created_At": "2024-02-20T15:40:00Z",
    "updated_At": "2024-03-26T12:00:00Z"
  },
  {
    "title": "Waterfront Bungalow",
    "type": "Bungalow",
    "location": "222 Harbor View, Seattle, WA 98101",
    "price": 380000,
    "short": "Quaint bungalow with private dock",
    "image": "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&h=400&fit=crop",
    "description": "Charming waterfront property with private dock, updated kitchen, and stunning water views. Perfect for boat enthusiasts and nature lovers.",
    "created_At": "2024-01-28T13:25:00Z",
    "updated_At": "2024-03-19T16:45:00Z"
  },
  {
    "title": "Luxury High-Rise Condo",
    "type": "Condominium",
    "location": "333 Tower Avenue, Chicago, IL 60601",
    "price": 410000,
    "short": "50th floor condo with lake views",
    "image": "https://images.unsplash.com/photo-1540518614846-7eded1024f43?w=600&h=400&fit=crop",
    "description": "Sophisticated high-rise living with floor-to-ceiling windows, premium finishes, and access to building amenities including pool, spa, and business center.",
    "created_At": "2024-02-12T11:10:00Z",
    "updated_At": "2024-03-22T10:30:00Z"
  },
  {
    "title": "Country Farmhouse",
    "type": "Farmhouse",
    "location": "444 Country Road, Napa Valley, CA 94558",
    "price": 1250000,
    "short": "Restored farmhouse on vineyard estate",
    "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop",
    "description": "Historic farmhouse completely renovated on 10-acre vineyard property. Features chef's kitchen, wine cellar, and wraparound porch with vineyard views.",
    "created_At": "2024-01-20T09:35:00Z",
    "updated_At": "2024-03-25T15:20:00Z"
  },
  {
    "title": "Modern Duplex",
    "type": "Duplex",
    "location": "555 Twin Peaks, Austin, TX 78701",
    "price": 295000,
    "short": "Investment duplex near university",
    "image": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop",
    "description": "Well-maintained duplex with separate utilities, updated kitchens, and private yards. Excellent investment property in high-demand rental area near university.",
    "created_At": "2024-02-25T14:55:00Z",
    "updated_At": "2024-03-18T13:15:00Z"
  },
  {
    "title": "Lakeside Mansion",
    "type": "Mansion",
    "location": "666 Prestige Point, Lake Tahoe, CA 96150",
    "price": 3500000,
    "short": "Luxury estate with private beach",
    "image": "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&h=400&fit=crop",
    "description": "Magnificent lakeside estate featuring 8 bedrooms, home theater, wine cellar, and private beach. Includes boat house and guest cottage on 5-acre property.",
    "created_At": "2024-01-17T12:40:00Z",
    "updated_At": "2024-03-24T14:05:00Z"
  },
  {
    "title": "Urban Studio Flat",
    "type": "Studio",
    "location": "777 Compact Street, San Francisco, CA 94102",
    "price": 1100,
    "short": "Efficient studio in prime location",
    "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    "description": "Smartly designed studio apartment maximizing space with built-in storage and multi-functional furniture. Perfect location with walk score of 95.",
    "created_At": "2024-02-08T10:05:00Z",
    "updated_At": "2024-03-21T11:50:00Z"
  },
  {
    "title": "Ski Resort Condo",
    "type": "Condominium",
    "location": "888 Powder Lane, Park City, UT 84060",
    "price": 2750,
    "short": "Slope-side condo with ski storage",
    "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    "description": "Perfect ski getaway property with direct gondola access, heated boot dryers, and mountain views. Includes access to resort amenities and pools.",
    "created_At": "2024-02-15T15:15:00Z",
    "updated_At": "2024-03-26T08:40:00Z"
  }
]

module.exports = data