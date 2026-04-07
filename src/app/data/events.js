import eventHeroImage from '@/app/assets/event/event-hero.jpg';

import partnerImg1 from '@/app/assets/event/1-partner.jpg';
import partnerImg2 from '@/app/assets/event/2-partner.jpg';
import partnerImg3 from '@/app/assets/event/3-partner.jpg';
import partnerImg4 from '@/app/assets/event/4-partner.jpg';
import partnerImg5 from '@/app/assets/event/5-partner.jpg';
import customerImg6 from '@/app/assets/event/6 - customer.jpg';
import customer1_1 from '@/app/assets/event/customer1 - 1.jpg';
import customer1_2 from '@/app/assets/event/customer1 - 2.jpg';
import customer1_3 from '@/app/assets/event/customer1 - 3.jpg';
import customer1_4 from '@/app/assets/event/customer1 - 4.jpg';
import customer1_5 from '@/app/assets/event/customer1 - 5.jpg';
import customer1_6 from '@/app/assets/event/customer1 - 6.jpg';
import partner1_1 from '@/app/assets/event/partner1-1.jpg';
import partner1_2 from '@/app/assets/event/partner1-2.jpg';
import partner1_3 from '@/app/assets/event/partner1-3.jpg';
import partner1_4 from '@/app/assets/event/partner1-4.jpg';
import partner1_5 from '@/app/assets/event/partner1-5.jpg';
import partner1_6 from '@/app/assets/event/partner1-6.jpg';
import partner2_1 from '@/app/assets/event/partner2_1.jpg';
import partner2_2 from '@/app/assets/event/partner2_2.jpg';
import partner2_3 from '@/app/assets/event/partner2_3.jpg';
import partner2_4 from '@/app/assets/event/partner2_4.jpg';
import partner2_5 from '@/app/assets/event/partner2_5.jpg';
import partner2_6 from '@/app/assets/event/partner2_6.jpg';


export const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'Accelerate Your Cyber Security Immunity with Sophos',
    type: 'customer',
    when: 'past',
    date: '13/11/2025',
    tag: 'PAST EVENT',
    slug: 'Accelerate Your Cyber Security Immunity with Sophos',
    images: [customer1_1, customer1_2, customer1_3, customer1_4, customer1_5, customer1_6],
    description: "Sinetcom (Pvt) Ltd, in collaboration with AlphaSonic Technologies (Pvt) Ltd, hosted the event “Accelerate Your Cyber Security Immunity with Sophos” at Marino Beach Hotel, Colombo, featuring Mr. Prasad Wijesuriya from Sophos, who shared key insights on modern cybersecurity. The event brought together industry professionals for knowledge sharing and collaboration, contributing to a stronger cybersecurity landscape in Sri Lanka."
  },
  {
    id: 2,
    title: 'Sophos Security Solutions – Technical Knowledge Sharing Session',
    type: 'partner',
    when: 'past',
    date: '12/12/2025',
    tag: 'PAST EVENT',
    slug: 'Sophos Security Solutions – Technical Knowledge Sharing Session',
    images: [partner1_1, partner1_2, partner1_3, partner1_4, partner1_5, partner1_6],
    description: "Sinetcom successfully hosted the Sophos Security Solutions – Technical Knowledge Sharing Session at the Sinetcom Training Centre, Colombo 06, providing a focused platform for technical knowledge exchange. The session concluded with an engaging quiz, where participants tested their understanding, and winners were recognized with gifts. We thank all attendees for their active participation and look forward to continuing collaboration in advancing cybersecurity expertise."
  },
  {
    id: 3,
    title: 'Sophos Technical Training Session for Finco Technologies',
    type: 'partner',
    when: 'past',
    date: '20/12/2026',
    tag: 'PAST EVENT',
    slug: 'Sophos Technical Training Session for Finco Technologies',
    images: [partner2_1, partner2_2, partner2_3, partner2_4, partner2_5, partner2_6],
    description: "Sinetcom (Pvt) Ltd conducted a targeted technical training session on Sophos solutions for Finco Technologies Private Limited, creating a platform for in-depth knowledge sharing and discussions on security technologies and best practices. The session strengthened collaboration between both teams, and we extend our appreciation to the Finco Technologies team for their active participation and engagement in advancing cybersecurity expertise."
  },
  {
    id: 4,
    title: 'StorONE Backup Best Practices',
    type: 'webinar',
    when: 'past',
    date: '08/01/2026',
    tag: 'WEBINAR',
    slug: 'storone-backup-webinar',
    images: [partnerImg4, eventHeroImage],
    description: "Missed the live session? Catch up on how to optimize your backup infrastructure using StorONE's latest storage technologies. This session covers backup strategy, ransomware protection and data recovery."
  },
  {
    id: 5,
    title: 'Enterprise IT Roundtable',
    type: 'customer',
    when: 'past',
    date: '22/02/2026',
    tag: 'PAST EVENT',
    slug: 'enterprise-it-roundtable',
    images: [customerImg6, eventHeroImage],
    description: "A summary of the key takeaways from our exclusive executive roundtable session covering cloud migration and hybrid workforce security. Industry experts discuss the challenges and successes of modern cloud architecture."
  },
  {
    id: 6,
    title: 'Channel Partner Meetup',
    type: 'partner',
    when: 'future',
    date: '14/03/2026',
    tag: 'FUTURE EVENT',
    slug: 'channel-partner-meetup',
    images: [partnerImg5, partnerImg1],
    description: "Networking event for our channel partners to celebrate successes and discuss future roadmaps in a relaxed environment. Meet other professionals and learn about upcoming product releases."
  },
];
