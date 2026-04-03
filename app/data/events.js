import eventHeroImage from '../assets/event/event-hero.jpg';

// Dynamic image assets moved to public/assets/events/ folder
const summitImage = "/assets/events/summit.jpg";
const workshopImage = "/assets/events/workshop.jpg";
const roundtableImage = "/assets/events/roundtable.jpg";

export const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'Sinetcom Cyber Security Summit 2026',
    type: 'customer',
    when: 'future',
    dateStart: '05/10/2026',
    dateEnd: '06/10/2026',
    tag: 'FUTURE EVENT',
    slug: 'cyber-security-summit-2026',
    images: [summitImage, eventHeroImage, roundtableImage],
    description: "Join industry leaders at our flagship summit to explore the cutting edge of cybersecurity defense and strategy. Experience deep-dive technical sessions and exclusive networking opportunities. This event features deep-dive technical sessions and exclusive networking opportunities for all attendees."
  },
  {
    id: 2,
    title: 'Partner Enablement Workshop',
    type: 'partner',
    when: 'future',
    dateStart: '15/11/2026',
    dateEnd: '16/11/2026',
    tag: 'FUTURE EVENT',
    slug: 'partner-enablement-workshop',
    images: [workshopImage, eventHeroImage],
    description: "An intensive training session designed for Sinetcom partners to master the latest solutions and enhance their service delivery capabilities. Get hands-on with new product features and learn how to implement them effectively in your client environments."
  },
  {
    id: 3,
    title: 'Sophos Solutions Webinar Series',
    type: 'webinar',
    when: 'future',
    dateStart: '20/12/2026',
    dateEnd: '20/12/2026',
    tag: 'WEBINAR',
    slug: 'sophos-webinar-series',
    images: [eventHeroImage, summitImage],
    description: "Weekly deep-dives into the Sophos ecosystem. Learn about everything from MDR to firewall configuration in these expert-led virtual sessions. Our experts will cover troubleshooting, advanced configuration and much more."
  },
  {
    id: 4,
    title: 'StorONE Backup Best Practices',
    type: 'webinar',
    when: 'past',
    dateStart: '08/01/2026',
    dateEnd: '08/01/2026',
    tag: 'WEBINAR',
    slug: 'storone-backup-webinar',
    images: [roundtableImage, workshopImage],
    description: "Missed the live session? Catch up on how to optimize your backup infrastructure using StorONE's latest storage technologies. This session covers backup strategy, ransomware protection and data recovery."
  },
  {
    id: 5,
    title: 'Enterprise IT Roundtable',
    type: 'customer',
    when: 'past',
    dateStart: '22/02/2026',
    dateEnd: '22/02/2026',
    tag: 'PAST EVENT',
    slug: 'enterprise-it-roundtable',
    images: [roundtableImage, summitImage],
    description: "A summary of the key takeaways from our exclusive executive roundtable session covering cloud migration and hybrid workforce security. Industry experts discuss the challenges and successes of modern cloud architecture."
  },
  {
    id: 6,
    title: 'Channel Partner Meetup',
    type: 'partner',
    when: 'future',
    dateStart: '14/03/2026',
    dateEnd: '15/03/2026',
    tag: 'FUTURE EVENT',
    slug: 'channel-partner-meetup',
    images: [summitImage, workshopImage],
    description: "Networking event for our channel partners to celebrate successes and discuss future roadmaps in a relaxed environment. Meet other professionals and learn about upcoming product releases."
  },
];
