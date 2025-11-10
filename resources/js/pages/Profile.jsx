import ProfilePage from '@/components/ProfilePage';
import React from 'react';

function Profile({ data }) {
  console.log(data);

  // "about" JSON string ko parse karo safely
  const about = data?.about ? JSON.parse(data.about) : {};

  // final profile object bana lo including related tables
  const profile = {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    image: data.image,
    tier: data.tier_id,
    state: data.state,
    views: data.views,
    businessType: data.business_type,
    bio: about.bio || "",
    headline: about.headline || "",
    tagline: about.tagline || "",
    createdAt: data.created_at,

    // 👇 new additions
    services: data.services || [],
    testimonials: data.testimonials || [],
    offers: data.offers || [],
  };

  return <ProfilePage profile={profile} />;
}

export default Profile;
