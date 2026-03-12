-- ===========================================
-- LIZGAT Hotel - Update Images to Local Paths
-- Run this in phpMyAdmin to replace Unsplash URLs
-- ===========================================

-- 1. Update Rooms
UPDATE `rooms` SET `image` = '/images/rooms/room-2/036.jpg', `images` = '["/images/rooms/room-2/036.jpg","/images/rooms/room-2/037.jpg","/images/rooms/room-2/038.jpg"]' WHERE `slug` = 'standard-room';
UPDATE `rooms` SET `image` = '/images/rooms/room-4/045.jpg', `images` = '["/images/rooms/room-4/045.jpg","/images/rooms/room-4/046.jpg","/images/rooms/room-4/047.jpg"]' WHERE `slug` = 'deluxe-room';
UPDATE `rooms` SET `image` = '/images/rooms/room-7/055.jpg', `images` = '["/images/rooms/room-7/055.jpg","/images/rooms/room-7/056.jpg","/images/rooms/room-7/057.jpg"]' WHERE `slug` = 'executive-suite';
UPDATE `rooms` SET `image` = '/images/rooms/room-10/066.jpg', `images` = '["/images/rooms/room-10/066.jpg","/images/rooms/room-10/067.jpg","/images/rooms/room-10/068.jpg"]' WHERE `slug` = 'family-room';
UPDATE `rooms` SET `image` = '/images/rooms/room-11/077.jpg', `images` = '["/images/rooms/room-11/077.jpg","/images/rooms/room-11/078.jpg","/images/rooms/room-11/079.jpg"]' WHERE `slug` = 'presidential-suite';
UPDATE `rooms` SET `image` = '/images/rooms/room-14/089.jpg', `images` = '["/images/rooms/room-14/089.jpg","/images/rooms/room-14/090.jpg","/images/rooms/room-14/091.jpg"]' WHERE `slug` = 'honeymoon-suite';

-- 2. Update Amenities
UPDATE `amenities` SET `image` = '/images/environs/009.jpg' WHERE `amenityId` = 'pool';
UPDATE `amenities` SET `image` = '/images/environs/014.jpg' WHERE `amenityId` = 'spa';
UPDATE `amenities` SET `image` = '/images/environs/015.jpg' WHERE `amenityId` = 'gym';
UPDATE `amenities` SET `image` = '/images/restaurant/027.jpg' WHERE `amenityId` = 'restaurant';
UPDATE `amenities` SET `image` = '/images/conference/001.jpg' WHERE `amenityId` = 'conference';
UPDATE `amenities` SET `image` = '/images/reception/024.jpg' WHERE `amenityId` = 'business';
UPDATE `amenities` SET `image` = '/images/environs/006.jpg' WHERE `amenityId` = 'shuttle';
UPDATE `amenities` SET `image` = '/images/reception/025.jpg' WHERE `amenityId` = 'wifi';
UPDATE `amenities` SET `image` = '/images/reception/023.jpg' WHERE `amenityId` = 'concierge';
UPDATE `amenities` SET `image` = '/images/mart/017.jpg' WHERE `amenityId` = 'laundry';
UPDATE `amenities` SET `image` = '/images/environs/008.jpg' WHERE `amenityId` = 'parking';
UPDATE `amenities` SET `image` = '/images/environs/007.jpg' WHERE `amenityId` = 'security';

-- 3. Update Gallery Images
UPDATE `gallery_images` SET `src` = '/images/environs/005.jpg', `alt` = 'Hotel exterior view' WHERE `sortOrder` = 0;
UPDATE `gallery_images` SET `src` = '/images/rooms/room-2/036.jpg', `alt` = 'Standard room interior' WHERE `sortOrder` = 1;
UPDATE `gallery_images` SET `src` = '/images/environs/010.jpg', `alt` = 'Hotel surroundings' WHERE `sortOrder` = 2;
UPDATE `gallery_images` SET `src` = '/images/restaurant/027.jpg', `alt` = 'Restaurant and dining area' WHERE `sortOrder` = 3;
UPDATE `gallery_images` SET `src` = '/images/conference/001.jpg', `alt` = 'Conference hall setup' WHERE `sortOrder` = 4;
UPDATE `gallery_images` SET `src` = '/images/rooms/room-4/045.jpg', `alt` = 'Deluxe room interior' WHERE `sortOrder` = 5;
UPDATE `gallery_images` SET `src` = '/images/reception/023.jpg', `alt` = 'Hotel reception' WHERE `sortOrder` = 6;
UPDATE `gallery_images` SET `src` = '/images/environs/012.jpg', `alt` = 'Hotel entrance' WHERE `sortOrder` = 7;
UPDATE `gallery_images` SET `src` = '/images/rooms/room-7/055.jpg', `alt` = 'Executive suite living room' WHERE `sortOrder` = 8;
UPDATE `gallery_images` SET `src` = '/images/restaurant/030.jpg', `alt` = 'Bar and lounge area' WHERE `sortOrder` = 9;
UPDATE `gallery_images` SET `src` = '/images/conference/003.jpg', `alt` = 'Conference room' WHERE `sortOrder` = 10;
UPDATE `gallery_images` SET `src` = '/images/rooms/room-14/089.jpg', `alt` = 'Honeymoon suite' WHERE `sortOrder` = 11;

-- 4. Update Page Content (about story image)
UPDATE `page_content` SET `content` = REPLACE(`content`, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', '/images/environs/005.jpg') WHERE `page` = 'about' AND `section` = 'story';
