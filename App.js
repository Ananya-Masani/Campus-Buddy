import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView,
  FlatList, StyleSheet, Linking, Image, KeyboardAvoidingView, Platform, StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCHOOL, LINKS, CLUBS, FAQ, CHECKLIST, AMBASSADORS, MENTORS, INTERESTS, RDT_NOTE, COUNSELORS, OTHER_STAFF, findCounselor, BELL, KEY_DATES } from './school';

const C = {
  navy: '#13294B', gold: '#F2B33D', teal: '#2A9D8F', bg: '#F5F7FA',
  card: '#FFFFFF', text: '#1B1F27', mute: '#6B7280', line: '#E3E7EE',
};
const openUrl = u => Linking.openURL(u).catch(() => {});
const KEY = 'campus_buddy_v1';
const GRADES = ['9th', '10th', '11th', '12th'];

const MOODS = [
  { e: '😟', label: 'Rough', tip: 'That is okay. Request a senior mentor below. Talking to someone who has been there helps. If you ever feel unsafe, call or text 988.' },
  { e: '😐', label: 'Meh', tip: 'Try one small step today: message an ambassador or check off one item on your checklist.' },
  { e: '🙂', label: 'Good', tip: 'Nice! Keep the momentum. Sign up for a club this week.' },
];

const AUTO = [
  [/(hi|hello|hey|sup)\b/i, n => `Hey! I'm ${n}. Welcome! What's been the hardest part of starting here?`],
  [/locker/i, () => 'Ask the front office or your counselor about your locker. Want me to walk with you tomorrow?'],
  [/lunch|eat|cafeteria/i, () => 'You can sit with us at lunch! Just find me.'],
  [/club|join/i, () => 'Check the Clubs tab for what is out there. I can go with you to a first meeting.'],
  [/nervous|scared|anxious|alone|lonely|overwhelm/i, () => 'Totally normal. I felt the same when I moved. You are not alone, and it gets easier fast.'],
  [/team|tryout|sport/i, () => 'Check the Athletics link in the Clubs tab, or ask your counselor about tryouts.'],
  [/thank/i, () => 'Anytime! That is what buddies are for.'],
];
const reply = (t, n) => {
  for (const [re, fn] of AUTO) if (re.test(t)) return fn(n);
  return 'Good question! Check the Guide tab for official links, or ask your counselor.';
};

/* ---------------- Onboarding ---------------- */
function Onboarding({ onDone }) {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [picked, setPicked] = useState([]);
  const toggle = i => setPicked(p => (p.includes(i) ? p.filter(x => x !== i) : [...p, i]));
  const ready = name.trim() && grade && picked.length > 0;
  return (
    <ScrollView contentContainerStyle={s.pad} keyboardShouldPersistTaps="handled">
      <Text style={s.hero}>New to Rock Hill?{'\n'}You are not alone.</Text>
      <Text style={s.sub}>Campus Buddy connects transfer students with peers and mentors who have been there.</Text>
      <Text style={s.label}>What should we call you?</Text>
      <TextInput style={s.search} value={name} onChangeText={setName} placeholder="Your first name" />
      <Text style={s.label}>Your grade</Text>
      <View style={s.chips}>
        {GRADES.map(g => (
          <TouchableOpacity key={g} onPress={() => setGrade(g)} style={[s.chip, grade === g && s.chipOn]}>
            <Text style={[s.chipT, grade === g && s.chipTOn]}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={s.label}>What are you into? Pick at least one.</Text>
      <View style={s.chips}>
        {INTERESTS.map(i => (
          <TouchableOpacity key={i} onPress={() => toggle(i)} style={[s.chip, picked.includes(i) && s.chipOn]}>
            <Text style={[s.chipT, picked.includes(i) && s.chipTOn]}>{i}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={[s.btn, !ready && { opacity: 0.4 }]} disabled={!ready}
        onPress={() => onDone({ name: name.trim(), grade, interests: picked })}>
        <Text style={s.btnT}>Find my people</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------------- Match ---------------- */
function Match({ profile, onChat, onEdit }) {
  const ranked = AMBASSADORS
    .map(a => ({ ...a, shared: a.interests.filter(i => profile.interests.includes(i)) }))
    .sort((a, b) => b.shared.length - a.shared.length);
  return (
    <ScrollView contentContainerStyle={s.pad}>
      <View style={s.banner}>
        <Text style={s.bannerH}>Hey {profile.name}!</Text>
        <Text style={s.bannerT}>Here are ambassadors who like {profile.interests.slice(0, 3).join(', ').toLowerCase()}.</Text>
      </View>
      <TouchableOpacity onPress={onEdit}><Text style={s.link}>Edit my profile</Text></TouchableOpacity>
      {ranked.map((a, idx) => (
        <View key={a.id} style={s.card}>
          <View style={s.row}>
            <View style={s.avatar}><Text style={s.avatarT}>{a.name[0]}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={s.name}>{a.name}</Text>
              <Text style={s.mute}>{a.grade} ambassador</Text>
            </View>
            <View style={[s.badge, a.shared.length === 0 && { backgroundColor: C.mute }]}>
              <Text style={s.badgeT}>{idx === 0 && a.shared.length > 0 ? 'Top match' : `${a.shared.length} shared`}</Text>
            </View>
          </View>
          <Text style={s.body}>{a.bio}</Text>
          {a.shared.length > 0 && <Text style={[s.mute, { color: C.teal }]}>You both like: {a.shared.join(', ')}</Text>}
          <TouchableOpacity style={s.btn} onPress={() => onChat(a)}>
            <Text style={s.btnT}>Say hi to {a.name.split(' ')[0]}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

/* ---------------- Chat ---------------- */
function Chat({ buddy, onPickBuddy, threads, update }) {
  const [text, setText] = useState('');
  const listRef = useRef(null);

  if (!buddy) {
    return (
      <ScrollView contentContainerStyle={s.pad}>
        <Text style={s.h1}>Buddy Chat</Text>
        <Text style={s.sub}>Pick an ambassador to start a conversation.</Text>
        {AMBASSADORS.map(a => {
          const t = threads[a.id];
          return (
            <TouchableOpacity key={a.id} style={[s.card, s.row]} onPress={() => onPickBuddy(a)}>
              <View style={s.avatar}><Text style={s.avatarT}>{a.name[0]}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={s.name}>{a.name}</Text>
                <Text style={s.mute} numberOfLines={1}>{t ? t[t.length - 1].text : 'Start a conversation'}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  const first = buddy.name.split(' ')[0];
  const msgs = threads[buddy.id] || [{ id: 'w', from: 'them', text: `Hi! I'm ${first}. Ask me anything about the school.` }];
  const add = (m) => update(d => ({ ...d, threads: { ...d.threads, [buddy.id]: [...(d.threads[buddy.id] || msgs), m] } }));

  const send = (preset) => {
    const msg = (preset || text).trim();
    if (!msg) return;
    add({ id: Date.now() + 'u', from: 'me', text: msg });
    setText('');
    setTimeout(() => add({ id: Date.now() + 'b', from: 'them', text: reply(msg, first) }), 800);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={s.chatHead}>
        <TouchableOpacity onPress={() => onPickBuddy(null)}><Text style={s.back}>Back</Text></TouchableOpacity>
        <Text style={s.chatName}>{buddy.name}</Text>
        <View style={{ width: 40 }} />
      </View>
      <FlatList
        ref={listRef} data={msgs} keyExtractor={m => m.id}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => (
          <View style={[s.bubble, item.from === 'me' ? s.me : s.them]}>
            <Text style={item.from === 'me' ? s.meT : s.themT}>{item.text}</Text>
          </View>
        )}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 48 }} contentContainerStyle={{ paddingHorizontal: 12 }}>
        {['Where is my locker?', 'Can I sit with you at lunch?', 'How do clubs work?', "I'm nervous"].map(q => (
          <TouchableOpacity key={q} style={s.quick} onPress={() => send(q)}>
            <Text style={s.quickT}>{q}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={s.inputRow}>
        <TextInput style={s.input} value={text} onChangeText={setText} placeholder="Type a message" onSubmitEditing={() => send()} />
        <TouchableOpacity style={s.send} onPress={() => send()}><Text style={s.btnT}>Send</Text></TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ---------------- Guide helpers ---------------- */
function CounselorFinder() {
  const [last, setLast] = useState('');
  const c = findCounselor(last);
  return (
    <View style={s.card}>
      <Text style={s.name}>Find my counselor</Text>
      <TextInput style={s.search} value={last} onChangeText={setLast} placeholder="Type your last name" autoCapitalize="words" />
      {c && <Text style={s.body}>Your counselor is {c[0]} (last names {c[1]}). Confirm with the front office at {SCHOOL.phone}.</Text>}
      <Text style={[s.mute, { marginTop: 8 }]}>Also here to help: {OTHER_STAFF.map(o => `${o[0]} (${o[1]})`).join(', ')}.</Text>
    </View>
  );
}
function BellSchedule() {
  return (
    <View style={s.card}>
      <Text style={s.name}>Bell schedule (A/B days)</Text>
      {BELL.map(([p, b, e]) => (
        <View key={p} style={[s.row, { paddingVertical: 4 }]}>
          <Text style={[s.body, { flex: 1, marginTop: 0 }]}>{p}</Text>
          <Text style={[s.body, { marginTop: 0 }]}>{b} - {e}</Text>
        </View>
      ))}
      <Text style={s.mute}>7 minutes between classes. Dismissal at 4:20.</Text>
    </View>
  );
}
function KeyDates() {
  const today = new Date().toISOString().slice(0, 10);
  const next = KEY_DATES.filter(d => d[0] >= today).slice(0, 4);
  return (
    <View style={s.card}>
      <Text style={s.name}>Coming up</Text>
      {next.map(([d, label]) => (
        <Text key={d} style={s.body}>{new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: {label}</Text>
      ))}
      <Text style={[s.mute, { marginTop: 6 }]}>From the 2026-27 Prosper ISD calendar. Check the district site for changes.</Text>
    </View>
  );
}

/* ---------------- Guide ---------------- */
function Guide({ data, update }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(null);
  const hits = FAQ.filter(f => (f.q + f.a).toLowerCase().includes(q.toLowerCase()));
  const done = data.checks.length;
  const pct = Math.round((done / CHECKLIST.length) * 100);
  const toggleCheck = i => update(d => ({ ...d, checks: d.checks.includes(i) ? d.checks.filter(x => x !== i) : [...d.checks, i] }));
  const toggleReq = n => update(d => ({ ...d, requests: d.requests.includes(n) ? d.requests.filter(x => x !== n) : [...d.requests, n] }));
  const mood = MOODS.find(m => m.label === data.mood);

  return (
    <ScrollView contentContainerStyle={s.pad} keyboardShouldPersistTaps="handled">
      <Text style={s.h1}>How are you feeling today?</Text>
      <View style={[s.row, { marginTop: 8 }]}>
        {MOODS.map(m => (
          <TouchableOpacity key={m.label} style={[s.mood, data.mood === m.label && s.moodOn]}
            onPress={() => update(d => ({ ...d, mood: m.label }))}>
            <Text style={{ fontSize: 28 }}>{m.e}</Text>
            <Text style={s.mute}>{m.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {mood && <View style={s.tip}><Text style={s.body}>{mood.tip}</Text></View>}

      <View style={{ height: 8 }} />
      <CounselorFinder />
      <BellSchedule />
      <KeyDates />
      <Text style={[s.h1, { marginTop: 24 }]}>Your first-week checklist</Text>
      <View style={s.barBg}><View style={[s.barFill, { width: `${pct}%` }]} /></View>
      <Text style={s.mute}>{done} of {CHECKLIST.length} done{pct === 100 ? '. You did it!' : ''}</Text>
      {CHECKLIST.map((c, i) => (
        <TouchableOpacity key={c} style={[s.card, s.row]} onPress={() => toggleCheck(i)}>
          <View style={[s.box, data.checks.includes(i) && s.boxOn]}>
            {data.checks.includes(i) && <Text style={{ color: '#fff', fontWeight: '800' }}>✓</Text>}
          </View>
          <Text style={[s.body, { marginTop: 0, flex: 1 }, data.checks.includes(i) && { color: C.mute, textDecorationLine: 'line-through' }]}>{c}</Text>
        </TouchableOpacity>
      ))}

      <Text style={[s.h1, { marginTop: 24 }]}>Campus FAQ</Text>
      <TextInput style={s.search} value={q} onChangeText={setQ} placeholder="Search: locker, clubs, lunch..." />
      {hits.length === 0 && <Text style={s.mute}>No results. Try another word or request a mentor below.</Text>}
      {hits.map((f, i) => (
        <TouchableOpacity key={f.q} style={s.card} onPress={() => setOpen(open === i ? null : i)}>
          <Text style={s.name}>{f.q}</Text>
          {open === i && (
            <View>
              <Text style={[s.body, { marginTop: 8 }]}>{f.a}</Text>
              {f.link && (
                <TouchableOpacity style={s.btn} onPress={() => openUrl(f.link[1])}>
                  <Text style={s.btnT}>Open: {f.link[0]}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </TouchableOpacity>
      ))}

      <Text style={[s.h1, { marginTop: 24 }]}>Official {SCHOOL.short} links</Text>
      {['counselors', 'mental', 'bell', 'handbook', 'tip'].map(k => (
        <TouchableOpacity key={k} style={[s.card, s.row]} onPress={() => openUrl(LINKS[k][1])}>
          <Text style={[s.name, { flex: 1 }]}>{LINKS[k][0]}</Text>
          <Text style={s.link}>Open</Text>
        </TouchableOpacity>
      ))}
      <Text style={[s.h1, { marginTop: 24 }]}>Senior mentors (sample)</Text>
      {MENTORS.map(m => {
        const req = data.requests.includes(m.name);
        return (
          <View key={m.name} style={s.card}>
            <Text style={s.name}>{m.name}</Text>
            <Text style={s.body}>Helps with: {m.focus}</Text>
            <Text style={s.mute}>Available: {m.times}</Text>
            <TouchableOpacity style={[s.btn, req && { backgroundColor: C.teal }]} onPress={() => toggleReq(m.name)}>
              <Text style={s.btnT}>{req ? 'Requested (tap to cancel)' : 'Request a time'}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
      <Text style={[s.mute, { marginTop: 16 }]}>Ambassador and mentor profiles are samples for this demo. A real launch would use people approved by {SCHOOL.name}. Campus Buddy is a student project and is not run by {SCHOOL.district}.</Text>
    </ScrollView>
  );
}

/* ---------------- Clubs ---------------- */
function Clubs({ data, update }) {
  const [q, setQ] = useState('');
  const [openOnly, setOpenOnly] = useState(false);
  const mine = data.profile.interests;
  const list = CLUBS
    .filter(c => (!openOnly || c.open) && (c.name + c.about + c.sponsor).toLowerCase().includes(q.toLowerCase()))
    .map(c => ({ ...c, hit: c.tags.filter(x => mine.includes(x)) }))
    .sort((a, b) => b.hit.length - a.hit.length);
  const toggle = n => update(d => ({ ...d, clubs: d.clubs.includes(n) ? d.clubs.filter(x => x !== n) : [...d.clubs, n] }));
  return (
    <ScrollView contentContainerStyle={s.pad} keyboardShouldPersistTaps="handled">
      <Text style={s.h1}>Clubs ({CLUBS.length})</Text>
      <Text style={s.sub}>Rock Hill clubs for 2026-27, sorted by your interests.</Text>
      <TextInput style={s.search} value={q} onChangeText={setQ} placeholder="Search clubs, sponsors, topics" />
      <TouchableOpacity style={[s.chip, openOnly && s.chipOn, { alignSelf: 'flex-start' }]} onPress={() => setOpenOnly(!openOnly)}>
        <Text style={[s.chipT, openOnly && s.chipTOn]}>Open to everyone</Text>
      </TouchableOpacity>
      {list.map(c => {
        const on = data.clubs.includes(c.name);
        return (
          <View key={c.name} style={s.card}>
            <View style={s.row}>
              <Text style={[s.name, { flex: 1 }]}>{c.name}</Text>
              {c.hit.length > 0 && <View style={s.badge}><Text style={s.badgeT}>Matches you</Text></View>}
            </View>
            <Text style={s.mute}>Sponsor: {c.sponsor}</Text>
            <Text style={s.body}>{c.about}</Text>
            <Text style={[s.mute, { color: c.open ? C.teal : '#B45309', fontWeight: '700' }]}>
              {c.open ? 'Open to all students' : `Requirements: ${c.req}`}
            </Text>
            <Text style={s.mute}>Meets: {c.meets} · Where: {c.where}</Text>
            <Text style={s.mute}>Fee: {c.fee}</Text>
            {c.rdt && <Text style={s.mute}>{RDT_NOTE}</Text>}
            <TouchableOpacity style={[s.btn, on && { backgroundColor: C.teal }]} onPress={() => toggle(c.name)}>
              <Text style={s.btnT}>{on ? 'Interested ✓' : "I'm interested"}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
      {list.length === 0 && <Text style={s.mute}>No clubs match. Try another word.</Text>}
      <TouchableOpacity style={[s.btn, { backgroundColor: C.gold }]} onPress={() => openUrl(LINKS.clubs[1])}>
        <Text style={[s.btnT, { color: C.navy }]}>Official clubs page</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------------- App ---------------- */
const EMPTY = { profile: null, checks: [], threads: {}, requests: [], mood: null, clubs: [] };

export default function App() {
  const [data, setData] = useState(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState('match');
  const [buddy, setBuddy] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then(v => { if (v) setData({ ...EMPTY, ...JSON.parse(v) }); })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const update = fn => setData(prev => {
    const next = fn(prev);
    AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => {});
    return next;
  });

  const startChat = a => { setBuddy(a); setTab('chat'); };
  const tabs = [['match', '🤝', 'Match'], ['chat', '💬', 'Chat'], ['clubs', '🎯', 'Clubs'], ['guide', '🧭', 'Guide']];

  let body;
  if (!loaded) body = <View style={s.center}><Text style={s.mute}>Loading...</Text></View>;
  else if (!data.profile || editing) {
    body = <Onboarding onDone={p => { update(d => ({ ...d, profile: p })); setEditing(false); }} />;
  } else {
    body = (
      <>
        <View style={{ flex: 1 }}>
          {tab === 'match' && <Match profile={data.profile} onChat={startChat} onEdit={() => setEditing(true)} />}
          {tab === 'chat' && <Chat buddy={buddy} onPickBuddy={setBuddy} threads={data.threads} update={update} />}
          {tab === 'clubs' && <Clubs data={data} update={update} />}
          {tab === 'guide' && <Guide data={data} update={update} />}
        </View>
        <View style={s.tabs}>
          {tabs.map(([k, icon, label]) => (
            <TouchableOpacity key={k} style={[s.tab, tab === k && s.tabActive]} onPress={() => setTab(k)}>
              <Text style={{ fontSize: 20, opacity: tab === k ? 1 : 0.5 }}>{icon}</Text>
              <Text style={[s.tabT, tab === k && s.tabOn]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.navy} />
      <View style={s.header}>
        <View style={s.logoMark}><Text style={s.logoMarkT}>CB</Text></View>
        <View><Text style={s.logo}>Campus Buddy</Text><Text style={s.logoSub}>{SCHOOL.name} · {SCHOOL.mascot}</Text></View>
      </View>
      {body}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { backgroundColor: C.navy, paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' },
  logoMark: { width: 32, height: 32, borderRadius: 8, backgroundColor: C.gold, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  logoMarkT: { color: C.navy, fontWeight: '900' },
  logoImg: { width: 40, height: 40, borderRadius: 10, marginRight: 10, backgroundColor: '#fff', resizeMode: 'contain' },
  heroLogo: { width: 190, height: 190, alignSelf: 'center', resizeMode: 'contain', marginBottom: 8 },
  tabActive: { borderTopWidth: 3, borderTopColor: C.gold, backgroundColor: '#FFFBF0' },
  logoSub: { color: '#D6DEEC', fontSize: 12 },
  logo: { color: '#fff', fontSize: 20, fontWeight: '800' },
  pad: { padding: 16, paddingBottom: 40 },
  hero: { fontSize: 32, fontWeight: '900', color: C.navy, marginTop: 8, marginBottom: 8 },
  h1: { fontSize: 22, fontWeight: '800', color: C.navy, marginBottom: 4 },
  sub: { color: C.mute, marginBottom: 12, fontSize: 15 },
  label: { fontWeight: '700', color: C.text, marginTop: 16, marginBottom: 4 },
  link: { color: C.teal, fontWeight: '700', marginTop: 10 },
  banner: { backgroundColor: C.navy, borderRadius: 20, padding: 22, borderBottomWidth: 4, borderBottomColor: C.gold },
  bannerH: { color: '#fff', fontSize: 24, fontWeight: '800' },
  bannerT: { color: '#D6DEEC', marginTop: 4, fontSize: 15 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 4 },
  chip: { borderWidth: 1.5, borderColor: C.navy, borderRadius: 20, paddingVertical: 7, paddingHorizontal: 14, margin: 4 },
  chipOn: { backgroundColor: C.navy },
  chipT: { color: C.navy, fontWeight: '600' },
  chipTOn: { color: '#fff' },
  card: { backgroundColor: C.card, borderRadius: 16, padding: 16, marginTop: 12, borderWidth: 1, borderColor: C.line, shadowColor: '#13294B', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: C.gold, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarT: { fontWeight: '800', color: C.navy, fontSize: 18 },
  name: { fontSize: 16, fontWeight: '700', color: C.text },
  mute: { color: C.mute, fontSize: 13, marginTop: 2 },
  body: { color: C.text, fontSize: 15, marginTop: 8 },
  badge: { backgroundColor: C.teal, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  badgeT: { color: '#fff', fontSize: 12, fontWeight: '700' },
  btn: { backgroundColor: C.navy, borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginTop: 12 },
  btnT: { color: '#fff', fontWeight: '700' },
  chatHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderColor: C.line, backgroundColor: '#fff' },
  back: { color: C.teal, fontWeight: '700' },
  chatName: { fontWeight: '800', fontSize: 16, color: C.navy },
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 16, marginBottom: 8 },
  me: { alignSelf: 'flex-end', backgroundColor: C.navy },
  them: { alignSelf: 'flex-start', backgroundColor: '#fff', borderWidth: 1, borderColor: C.line },
  meT: { color: '#fff' },
  themT: { color: C.text },
  quick: { borderWidth: 1, borderColor: C.teal, borderRadius: 16, paddingHorizontal: 12, justifyContent: 'center', marginRight: 8, marginVertical: 6 },
  quickT: { color: C.teal, fontWeight: '600' },
  inputRow: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderColor: C.line },
  input: { flex: 1, backgroundColor: C.bg, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8 },
  send: { backgroundColor: C.teal, borderRadius: 20, paddingHorizontal: 16, justifyContent: 'center', marginLeft: 8 },
  search: { backgroundColor: '#fff', borderWidth: 1, borderColor: C.line, borderRadius: 12, padding: 12, marginVertical: 8 },
  mood: { flex: 1, alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, borderWidth: 2, borderColor: C.line, paddingVertical: 10, marginHorizontal: 4 },
  moodOn: { borderColor: C.gold, backgroundColor: '#FFF8E6' },
  tip: { backgroundColor: '#E8F5F3', borderRadius: 12, padding: 12, marginTop: 10 },
  barBg: { height: 10, backgroundColor: C.line, borderRadius: 5, marginVertical: 8, overflow: 'hidden' },
  barFill: { height: 10, backgroundColor: C.teal },
  box: { width: 26, height: 26, borderRadius: 7, borderWidth: 2, borderColor: C.navy, marginRight: 12, alignItems: 'center', justifyContent: 'center' },
  boxOn: { backgroundColor: C.teal, borderColor: C.teal },
  tabs: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderColor: C.line },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  tabT: { color: C.mute, fontWeight: '600', fontSize: 12, marginTop: 2 },
  tabOn: { color: C.navy, fontWeight: '800' },
});