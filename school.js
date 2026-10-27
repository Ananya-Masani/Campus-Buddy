// Everything specific to Rock Hill High School lives here.
// Verified from https://www.prosper-isd.net/o/rhhs on Oct 25, 2026.
// To adapt Campus Buddy to another school, edit only this file.

export const SCHOOL = {
  name: 'Rock Hill High School',
  short: 'Rock Hill',
  mascot: 'Blue Hawks',
  district: 'Prosper ISD',
  address: '16061 Coit Road, Frisco, TX 75035',
  phone: '945-678-8100',
  hours: '8:55 a.m. - 4:20 p.m.',
  site: 'https://www.prosper-isd.net/o/rhhs',
};

// Official pages (all from the school's Students page)
export const LINKS = {
  bell: ['Bell schedule', 'https://www.prosper-isd.net/o/rhhs/page/bell-schedule'],
  clubs: ['Clubs and organizations', 'https://www.prosper-isd.net/o/rhhs/page/clubs-organizations'],
  counselors: ['Counselors', 'https://prosperisdtx.sites.thrillshare.com/o/rhhs/o/pisd/page/prosper-isd-school-counselors'],
  mental: ['Mental health resources', 'https://www.prosper-isd.net/page/counseling-academic-guidance-and-mental-health'],
  courses: ['Course selection', 'https://www.prosper-isd.net/o/rhhs/page/course-selection-information'],
  tutorials: ['Teacher tutorial schedule', 'https://sites.google.com/prosper-isd.net/rhhs-teacher-tutorials/home'],
  parking: ['Parking permits', 'https://www.prosper-isd.net/o/rhhs/page/parking-permit'],
  portal: ['Student portal (ClassLink)', 'https://launchpad.classlink.com/prosperisd/'],
  handbook: ['Student handbook and code of conduct', 'https://www.prosper-isd.net/o/pisd/page/handbooksstudent-code-of-conductdress-and-grooming'],
  tip: ['Report a concern (tip411)', 'https://www.prosper-isd.net/o/pisd/page/tip411'],
};


export const INTERESTS = ['STEM & Science', 'Coding & Tech', 'Art', 'Music', 'Dance', 'Medicine & Health', 'Business & Finance', 'Languages & Culture', 'Service', 'Debate & Government', 'Faith', 'Games & Hobbies', 'Sports', 'Leadership'];
const [STEM, CODE, ART, MUS, DAN, MED, BIZ, LANG, SVC, DEB, FAITH, GAME, SPT, LEAD] = INTERESTS;

// Source: "Rock Hill High School Clubs 2026-2027" sheet (shared by the student).
// [name, sponsor, about, openToAll, requirements, meets, where, fee, RDT eligible, tags]
const raw = [
  ['Aerospace Organization', 'Don Berliner', 'Monthly talks on real engineering projects.', 1, '', 'TBD', 'Room 1200', 'None', 0, [STEM]],
  ['American Heart Association', 'Maryam Rafiee', 'Heart-health awareness for future healthcare students.', 1, '', 'TBD', 'TBD', 'None', 0, [MED, SVC]],
  ['American Sign Language Club', 'Rebecca Mallory', 'Learn ASL and Deaf culture. No ASL class needed.', 1, '', 'TBD', 'Room 2233', '$20 (refreshments, shirt)', 0, [LANG]],
  ['ASL Honor Society', 'Brendon Feagans', 'Honor society with service for ASL students.', 0, 'Current or former ASL student, 3.8 ASL GPA, 3.5 overall GPA. 5 service and 5 participation hours per year.', 'Monthly', 'TBD', '$16', 0, [LANG]],
  ['Art Club', 'Karalee Scott', 'After-school art projects for school and community.', 1, '', 'TBD', 'Room 1305', '$10', 1, [ART]],
  ['Astronomy Club', 'Yolonda Simon', 'Space talks, activities, and field trips.', 1, '', 'TBD', 'Room 2103', '$0', 1, [STEM]],
  ['Bollywood Blue Hawks', 'Tish Cama', 'Learn Bollywood dance and perform at pep rallies.', 1, '', 'TBD', 'TBD', '$0', 0, [DAN]],
  ['Book Club', 'Sandy Avila', 'Read and discuss books of every genre.', 1, '', 'TBD', 'Room 1120', 'N/A', 0, [GAME]],
  ['CAIRO', 'Laura Spear', 'Student nonprofit fighting cancer through education and fundraising.', 1, '', 'TBD', 'Room 2111', 'N/A', 0, [MED, SVC]],
  ['Cheerabilities', 'Alison Landsiedel', 'Cheerleaders teach routines to students with special needs.', 0, 'Cheerleaders working with centralized (FA, Life Skills, ALC) students.', 'TBD', 'TBD', 'N/A', 0, [DAN, SVC]],
  ['Chinese Honor Society', 'Amy Kao', 'Celebrates Chinese language and culture.', 0, 'Two years of Chinese, continuing to Chinese III and IV.', 'TBD', 'TBD', '$50', 0, [LANG]],
  ['Closer2Christ', 'Sandy Avila', 'Bible study and fellowship. Everyone welcome.', 1, '', 'TBD', 'Room 1120', 'N/A', 0, [FAITH]],
  ['Crochet Club', 'Delaine Ulmer, Brenda Briley', 'Crochet for all skill levels.', 1, '', 'TBD', 'Library', 'None', 0, [ART, GAME]],
  ['Environmental Club', 'Sharlene Sabonis', 'Make a positive impact on the environment.', 1, '', 'TBD', 'TBD', 'None', 0, [STEM, SVC]],
  ['FCA', 'Gabby Symmank', 'Faith, prayer, and friendship. Open to all, not just athletes.', 1, '', 'TBD', 'Arena', 'N/A', 0, [FAITH, SPT]],
  ['French Club', 'Afy Nelson', 'French food, culture, and music. No class needed.', 1, '', 'TBD', 'Room 2224', 'None', 0, [LANG]],
  ['French Honor Society', 'Afy Nelson', 'National French honor society.', 0, 'Two years of French and an 85+ average.', 'TBD', 'Classroom and off campus', '$30', 1, [LANG]],
  ['Friends of MSF', 'Yanxia Pan', 'Refugee advocacy and medical guest speakers (Doctors Without Borders).', 1, '', 'TBD', 'TBD', 'None', 0, [MED, SVC]],
  ['Girls Who Code', 'Christopher Roberson', 'Coding projects and tech speakers. No experience needed.', 1, '', 'TBD', 'Room 1229', 'N/A', 0, [CODE]],
  ['Healthcare Finance Club', 'Kerri Connelly', 'Where medicine meets business and finance.', 1, '', 'Last Friday of each month', 'Room 2100', '$0', 0, [MED, BIZ]],
  ['Hearts for Healing', 'Kathy Hoernke', 'Monthly cards and crafts for children in the hospital.', 1, '', 'Monthly, during SOAR', 'Room 2212', 'None', 0, [SVC]],
  ['High School Alliance of Future Physicians', 'Carlton Gentry', 'Medical experience, resources, and college advising.', 1, '', 'N/A', 'Room 1100', 'N/A', 0, [MED]],
  ['High School Research Club', 'Yanxia Pan', 'Workshops and publishing help for student researchers.', 0, 'Unweighted GPA above 3.0. Upperclassmen should be in an advanced STEM class.', 'TBD', 'TBD', '$5', 1, [STEM]],
  ['Hope Squad', 'Connor Galloway', 'Stay involved in Hope Squad after taking the elective.', 0, 'Must have completed the Hope Squad elective.', 'TBD', 'TBD', '$0', 1, [SVC]],
  ['Investing and Finance Club', 'Yanxia Pan', 'Wharton Investment Challenge: manage a virtual $100,000 portfolio.', 1, '', 'TBD', 'TBD', '$0', 0, [BIZ]],
  ['Mahjong Club', 'Adalis Figueroa', 'Learn and play mahjong. All levels welcome.', 1, '', 'TBD', 'TBD', '$0', 0, [GAME]],
  ['Make a Wish RHHS', 'Tammy Goshorn', 'Raises funds and awareness for children with serious illnesses.', 1, '', 'N/A', 'TBD', 'N/A', 0, [SVC]],
  ['Medical Journalism Club', 'Colin Weil', 'Research and write about current medical events.', 1, '', 'TBD', 'Room 2114', '$0', 0, [MED]],
  ['Mind4Youth', 'Josh Volenik', 'Mental health awareness plus volunteering in North Texas.', 1, '', 'N/A', 'Room 2222', 'None', 0, [SVC]],
  ['Model United Nations', 'John Waring', 'Diplomacy simulations that build speaking and research skills.', 1, '', 'TBD', 'TBD', '$75', 1, [DEB]],
  ['Mu Alpha Theta', 'Maryam Rafiee', 'Math honor society.', 0, 'Honors Algebra 2 or higher, 85+ average, no disciplinary flags.', 'TBD', 'TBD', '$25 new, $15 returning', 0, [STEM]],
  ['National Art Honor Society', 'Crimson Kracy', 'Art scholarship, leadership, and service.', 0, 'Taken a high school art class. Application required.', 'Monthly, after school', 'Room 1303', '$30', 0, [ART]],
  ['National English Honor Society', 'Chase Vanderslice', 'Promotes reading and literacy in the community.', 0, 'Finished 9th grade English, 3.0 unweighted GPA, 10 service hours per year.', 'TBD', 'TBD', '$20', 1, [LEAD]],
  ['National Honor Society', 'Elise Hyatt, Sierra Ogletree', 'Juniors and seniors recognized for scholarship, leadership, service, and character.', 0, 'Juniors and seniors: 3.5 unweighted GPA, 40 service hours, 13 months of leadership, good conduct.', 'TBD', 'TBD', 'N/A', 1, [LEAD, SVC]],
  ['National Technical Honor Society', 'Omar Cheikh-Ali', 'Honors top Career and Technical Education students.', 0, 'Grades 10-12, in a CTE pathway, 3.0 unweighted GPA.', 'TBD', 'TBD', '$30 one time', 1, [LEAD]],
  ['PALS', 'Karen Allen, Niesha Brown', 'Brings general and special education students together.', 1, '', 'TBD', 'TBD', 'None', 0, [SVC]],
  ['Personal Finances & Investments', 'Courtney Serba', 'Stock simulations, budgeting, and guest speakers.', 1, '', 'SOAR, twice a month', 'Room 1115', 'None', 0, [BIZ]],
  ['Project Redpulse', 'Koen Maddock', 'Public health outreach and donation drives.', 1, '', 'TBD', 'Room 1123', 'N/A', 0, [MED, SVC]],
  ['R.I.S.E.', 'Mark Gentry', 'Respect, Impact, Service, Empower: unity and leadership.', 1, '', 'N/A', 'Room 1218 or LGI', 'None', 0, [LEAD, SVC]],
  ['RHHS Humanities Merit Society', 'Stephen Skiles', 'Discuss history and English and why they matter.', 1, '', 'N/A', 'Room 1130', 'N/A', 0, [DEB]],
  ['RHHS Mock Trial', 'Loralea Ray', 'Competitive mock trials. Learn how the courts work.', 1, '', 'Mon 4:30-6 pm (Rm 1122), Tue 4:30-6:30 pm (Courtroom)', 'Room 1122, RHHS Courtroom', '$100 registration and competition', 0, [DEB]],
  ['Rho Kappa Social Studies Honor Society', 'Sierra Ogletree', 'National social studies honor society.', 0, '3.0 GPA (3.5 per RHHS), two social studies courses, civic engagement, teacher letter.', 'TBD', 'Room 1217', '$7 induction, $10-20 cords', 0, [DEB]],
  ['Rock Hill Archery', 'John Singleton', 'Competitive archery team. Tryouts open to all.', 1, '', 'TBD', 'TBD', 'None', 1, [SPT]],
  ['Science National Honor Society', 'Ibet Klersy', 'Science outreach and community service.', 0, 'Juniors and seniors: 3.0 GPA, 3.5 science GPA, honors science courses.', 'First Wednesday monthly, before and after school', 'Room 2115', '$25', 1, [STEM]],
  ['Science Olympiad Club', 'Colin Weil', 'Prepare for Science Olympiad competitions.', 1, '', 'TBD', 'Room 2114', '$0', 0, [STEM]],
  ['Spanish Honor Society', 'Elizabeth Dzvonick', 'Recognizes top upper-level Spanish students.', 0, 'Upper-level Spanish, average above 85, teacher invitation.', 'TBD', 'TBD', '$32', 1, [LANG]],
  ['STEM Hawks United', 'Alex Zhu', 'Build a STEM resume with speakers, workshops, and volunteering.', 1, '', 'Thursdays, during SOAR', 'Room 2209', 'None', 0, [STEM, CODE]],
  ['Student Council', 'Alizee Garcia', 'Plans school events and gives students a voice.', 1, '', 'Monthly, during SOAR', 'LGI', '$37', 0, [LEAD]],
  ['Tabletop Club', 'Joshua Houpy', 'Board, card, and tabletop games.', 1, '', 'TBD', 'Room 2123', 'N/A', 0, [GAME]],
  ['Tri-M Music Honor Society', 'Mason Martinez', 'Honors music students for ability, leadership, and service.', 0, 'Must be enrolled in a music class.', 'TBD', 'TBD', '$0', 0, [MUS]],
  ['WISE', 'John Waring', 'Youth-led nonprofit teaching digital skills to older adults.', 1, '', 'TBD', 'TBD', 'None', 0, [SVC, BIZ]],
];
export const CLUBS = raw.map(([name, sponsor, about, open, req, meets, where, fee, rdt, tags]) =>
  ({ name, sponsor, about, open: !!open, req, meets, where, fee, rdt: !!rdt, tags }));
export const RDT_NOTE = 'RDT eligible: requires Prosper ISD random drug testing. One $25 fee per year covers every eligible activity.';

// Counselors (from the school staff page). Last-name ranges are for students.
export const COUNSELORS = [
  ['Torrey Collins', 'A-Chi', 'a'], ['Talia Dodd-Hegmann', 'Cho-Har', 'cho'],
  ['Kacy Austin', 'Has-L', 'has'], ['Julius Booth', 'M-Pat', 'm'],
  ['Karen Peters', 'Pau-Si', 'pau'], ['Latresea Kennedy', 'Sk-Z', 'sk'],
];
export const OTHER_STAFF = [['Sarah Black', 'Lead Counselor'], ['Adalis Figueroa', 'Student Support Counselor']];
export const findCounselor = last => {
  const n = last.trim().toLowerCase();
  if (!n) return null;
  let hit = null;
  for (const c of COUNSELORS) if (n >= c[2]) hit = c;
  return hit;
};

// Bell schedule (A/B days). Passing time between classes is 7 minutes.
export const BELL = [
  ['1st (A) / 5th (B)', '8:55', '10:25'],
  ['2nd (A) / 6th (B)', '10:32', '12:02'],
  ['Advisory', '12:02', '12:36'],
  ['3rd (A) / 7th (B)', '12:43', '2:43'],
  ['   A Lunch', '12:43', '1:13'], ['   B Lunch', '1:13', '1:43'],
  ['   C Lunch', '1:43', '2:13'], ['   D Lunch', '2:13', '2:43'],
  ['4th (A) / 8th (B)', '2:50', '4:20'],
];

// 2026-27 Prosper ISD calendar (updated May 26, 2026). Check the district site for changes.
export const KEY_DATES = [
  ['2026-11-23', 'Thanksgiving break, no school (Nov 23-27)'],
  ['2026-12-18', 'Early release. End of 2nd nine weeks'],
  ['2026-12-21', 'Winter break begins (through Dec 31)'],
  ['2027-01-04', 'Student holiday'],
  ['2027-01-05', '3rd nine weeks begins'],
  ['2027-01-18', 'School holiday'],
  ['2027-02-12', 'Student holiday'],
  ['2027-03-11', 'End of 3rd nine weeks'],
  ['2027-03-15', 'Spring break (through Mar 19)'],
  ['2027-03-22', '4th nine weeks begins'],
  ['2027-05-20', 'Early release. Last day of school'],
];

export const FAQ = [
  { q: 'What are the school hours?', a: `School runs ${SCHOOL.hours}. Lunch depends on your A, B, C, or D lunch. See the bell schedule in the Guide tab.` },
  { q: 'Where is the school and how do I reach the office?', a: `${SCHOOL.address}. Phone: ${SCHOOL.phone}.` },
  { q: 'Who is my counselor?', a: 'It depends on your last name. Use the counselor finder at the top of the Guide tab.', link: LINKS.counselors },
  { q: 'How do I join a club?', a: 'Open the Clubs tab. Some clubs are open to everyone and some have requirements. Contact the sponsor or ask your counselor.', link: LINKS.clubs },
  { q: 'What is SOAR time?', a: 'Several clubs meet during SOAR. Ask your teachers or counselor how your SOAR period works.' },
  { q: 'How do I log in to my student portal?', a: 'Use ClassLink with your Prosper ISD login.', link: LINKS.portal },
  { q: 'How do I get a parking permit?', a: 'Permits are handled on the school website. Parking permits count toward random drug testing.', link: LINKS.parking },
  { q: 'How do I get help from a teacher?', a: 'Teachers post tutorial times on the tutorial schedule.', link: LINKS.tutorials },
  { q: 'How do I pick classes?', a: 'Course selection info is on the school website.', link: LINKS.courses },
  { q: 'How do I transfer records from my old school?', a: `Out-of-state records requests are linked from the school website. Call ${SCHOOL.phone} if you are unsure.` },
  { q: 'I need mental health support', a: 'You can talk to your counselor any time. In a crisis, call or text 988.', link: LINKS.mental },
];

export const CHECKLIST = [
  'Log in to the student portal',
  'Learn the bell schedule and my lunch (A, B, C, or D)',
  'Find my counselor and say hello',
  'Walk to every class before the first bell',
  'Message a student ambassador',
  'Pick one club to try this month',
  'Save the teacher tutorial schedule',
  'Pick up a parking permit (if I drive)',
];

// SAMPLE profiles for the demo. A real launch would use ambassadors and mentors approved by the school.
export const AMBASSADORS = [
  { id: 1, name: 'Maya R.', grade: 'Junior', interests: [CODE, STEM, GAME], bio: 'Moved here in 9th grade. I know every shortcut.' },
  { id: 2, name: 'Jordan T.', grade: 'Senior', interests: [SPT, LEAD, SVC], bio: 'Varsity athlete. Happy to walk you to tryouts.' },
  { id: 3, name: 'Sofia L.', grade: 'Sophomore', interests: [ART, DAN, MUS], bio: 'Come sit with us at lunch.' },
  { id: 4, name: 'Ethan K.', grade: 'Junior', interests: [DEB, BIZ, SVC], bio: 'I love helping new people settle in.' },
  { id: 5, name: 'Priya S.', grade: 'Senior', interests: [MED, STEM, LANG], bio: 'Pre-med track. Ask me anything.' },
];
export const MENTORS = [
  { name: 'Sample Mentor A', focus: 'College prep, time management', times: 'Mon and Wed, lunch' },
  { name: 'Sample Mentor B', focus: 'Clubs, leadership, making friends', times: 'Tue and Thu, after school' },
  { name: 'Sample Mentor C', focus: 'Stress, study habits, AP classes', times: 'Mon, after school' },
];