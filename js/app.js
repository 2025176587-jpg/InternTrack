/* InternTrack – shared logic: data, auth guard, navbar/footer, page renderers */

// Demo data
const DEMO_APPS=[
 {id:1,company:'Petronas Digital',role:'Web Developer Intern',status:'Interview',date:'2026-07-03',city:'Kuala Lumpur'},
 {id:2,company:'Maybank Tech',role:'UI/UX Intern',status:'Applied',date:'2026-07-15',city:'Kuala Lumpur'},
 {id:3,company:'Grab Malaysia',role:'Frontend Intern',status:'Offer',date:'2026-06-20',city:'Petaling Jaya'},
 {id:4,company:'AirAsia Digital',role:'Data Analyst Intern',status:'Rejected',date:'2026-06-11',city:'Sepang'},
 {id:5,company:'Telekom Malaysia',role:'Systems Intern',status:'Applied',date:'2026-08-02',city:'Cyberjaya'},
 {id:6,company:'Shopee MY',role:'Content Management Intern',status:'Interview',date:'2026-08-09',city:'Kuala Lumpur'},
 {id:7,company:'Axiata',role:'Web Design Intern',status:'Rejected',date:'2026-05-28',city:'Kuala Lumpur'},
 {id:8,company:'MIMOS',role:'Software Intern',status:'Applied',date:'2026-08-21',city:'Kuala Lumpur'},
 {id:9,company:'Intel Malaysia',role:'QA Intern',status:'Offer',date:'2026-07-25',city:'Bayan Lepas'}
];
let APPS=[];
const COMPANIES=[
 {name:'Petronas Digital',industry:'Energy',city:'Kuala Lumpur',allowance:1500,open:3,image:'assets/companies/petronas.jpg',roles:['Software Engineering Intern','Data Analyst Intern']},
 {name:'Grab Malaysia',industry:'Tech',city:'Petaling Jaya',allowance:1800,open:5,image:'assets/companies/grab.jpg',roles:['Frontend Intern','Product Design Intern']},
 {name:'Telekom Malaysia',industry:'Telecom',city:'Cyberjaya',allowance:1200,open:2,image:'assets/companies/telekom.jpg',roles:['Network Engineering Intern','Systems Intern']},
 {name:'Intel Malaysia',industry:'Semiconductor',city:'Bayan Lepas',allowance:2000,open:4,image:'assets/companies/intel.jpg',roles:['QA Intern','Hardware Engineering Intern']},
 {name:'Maybank Tech',industry:'Finance',city:'Kuala Lumpur',allowance:1400,open:2,image:'assets/companies/maybank.jpg',roles:['UI/UX Intern','Cybersecurity Intern']},
 {name:'Shopee MY',industry:'E-commerce',city:'Kuala Lumpur',allowance:1700,open:6,image:'assets/companies/shopee.jpg',roles:['Content Management Intern','Business Analyst Intern']},
 {name:'AirAsia Digital',industry:'Aviation & Travel',city:'Sepang',allowance:null,open:null,image:'assets/companies/airasia.jpg',roles:['Data Analyst Intern','Marketing Intern']},
 {name:'Axiata',industry:'Telecom',city:'Kuala Lumpur',allowance:null,open:null,image:'assets/companies/axiata.jpg',roles:['Web Design Intern','Network Intern']},
 {name:'MIMOS',industry:'Research & Development',city:'Kuala Lumpur',allowance:null,open:null,image:'assets/companies/mimos.jpg',roles:['Software Intern','Research Assistant Intern']}
];
const INDUSTRIES=[...new Set(COMPANIES.map(company=>company.industry).concat(['Agriculture','Business Services','Construction','Education','Energy','Government','Healthcare','Hospitality','Logistics','Manufacturing','Media','Non-profit','Public sector','Real Estate','Retail','Technology','Other']))].sort();
const COLORS={Applied:'#547b8a',Interview:'#edae54',Offer:'#289875',Rejected:'#cf5d68'};
const BADGE={Applied:'status-applied',Interview:'status-interview',Offer:'status-offer',Rejected:'status-rejected'};
const MALAY_TEXT={
 'Log in':'Log masuk','Register':'Daftar','Account options':'Pilihan akaun','Log in or register':'Log masuk atau daftar',
 'Welcome':'Selamat datang','Keep every internship application offer in one place.':'Urus semua permohonan latihan industri anda di satu tempat.',
 'Demo login':'Log masuk demo','Username:':'Nama pengguna:','Password:':'Kata laluan:',
 'Username':'Nama pengguna','Password':'Kata laluan','Show password':'Papar kata laluan','Hide password':'Sembunyikan kata laluan',
 'InternTrack account access':'Akses akaun InternTrack','Switch to dark mode':'Tukar ke suasana Cahaya Bulan',
 'Log in | InternTrack':'Log masuk | InternTrack',
 'Sign in to continue your internship search.':'Log masuk untuk meneruskan pencarian latihan industri anda.',
 'Full name':'Nama penuh','Create account':'Cipta akaun','Account created. Log in below.':'Akaun berjaya dicipta. Log masuk di bawah.',
 'Internship resume':'Resume latihan industri','Application statistics':'Statistik permohonan',
 'Internship Candidate':'Calon latihan industri','Print resume':'Cetak resume',
 'Professional summary':'Ringkasan profesional',
 'A print-ready professional summary, education, skills, and internship application record.':'Ringkasan profesional, pendidikan, kemahiran dan rekod permohonan latihan industri yang sedia dicetak.',
 'Motivated student seeking internship opportunities with an interest in technology, design, and business. Focused on building practical experience and contributing communication, problem-solving, and teamwork skills.':'Pelajar bermotivasi yang mencari peluang latihan industri dan berminat dalam teknologi, reka bentuk serta perniagaan. Fokus untuk membina pengalaman praktikal serta menyumbang melalui kemahiran komunikasi, penyelesaian masalah dan kerja berpasukan.',
 'Contact details':'Maklumat untuk dihubungi',
 'Internship applications':'Permohonan latihan industri',
 'Companies and roles you have applied to, with current status.':'Syarikat dan jawatan yang telah dipohon berserta status terkini.',
 'Information Systems':'Sistem Maklumat',
 'Switch to Moonlight mood':'Tukar ke suasana Cahaya Bulan','Switch to Daybreak mood':'Tukar ke suasana Fajar',
 'Moonlight':'Cahaya Bulan','Daybreak':'Fajar','Switch language to Bahasa Melayu':'Tukar bahasa ke Bahasa Melayu',
 'Switch language to English':'Tukar bahasa ke English',
 'Dashboard':'Papan pemuka','Applications':'Permohonan','Companies':'Syarikat','My profile':'Profil saya',
 'WORKSPACE':'RUANG KERJA','View profile':'Lihat profil','Hi,':'Hai,','Log out':'Log keluar','Home':'Laman utama',
 'Main navigation':'Navigasi utama','Side navigation':'Navigasi sisi','Breadcrumb':'Jejak navigasi',
 'Open side menu':'Buka menu sisi','Close side menu':'Tutup menu sisi','Hide side menu':'Sembunyikan menu sisi',
 'INTERNSHIP SEARCH / OVERVIEW':'PENCARIAN LATIHAN INDUSTRI / RINGKASAN',
 'Welcome,':'Selamat datang,','Your internship search, progress, and next steps at a glance.':'Ringkasan pencarian latihan industri, kemajuan dan langkah seterusnya.',
 'Good morning,':'Selamat pagi,','Good afternoon,':'Selamat tengah hari,','Good evening,':'Selamat petang,',
 'Browse companies':'Terokai syarikat','All applications':'Semua permohonan','Summary':'Ringkasan',
 'Total applications':'Jumlah permohonan','Pending':'Dalam proses','Interviews':'Temu duga','Offers':'Tawaran','Rejected':'Ditolak',
 'View details':'Lihat butiran','Recent applications':'Permohonan terkini','All statuses':'Semua status',
 'View total applications':'Lihat jumlah permohonan','View pending':'Lihat permohonan dalam proses',
 'View interviews':'Lihat temu duga','View offers':'Lihat tawaran','View rejected':'Lihat permohonan ditolak',
 'Follow-ups & interviews':'Susulan & temu duga','Your next actions, with overdue reminders called out.':'Tindakan seterusnya dan peringatan yang telah lewat.',
 'Progress overview':'Ringkasan kemajuan','Applications by status':'Permohonan mengikut status',
 'Application overview':'Ringkasan permohonan','Progress and application charts':'Carta kemajuan dan permohonan',
 'No applications in this stage yet.':'Belum ada permohonan pada peringkat ini.',
 'Interview stage · Add a follow-up date in Applications to set a reminder.':'Peringkat temu duga · Tambah tarikh susulan dalam Permohonan untuk menetapkan peringatan.',
 'Application status details.':'Butiran status permohonan.',
 'Doughnut chart of applications by status':'Carta donat permohonan mengikut status',
 'Bar chart of applications sent per month':'Carta bar permohonan dihantar mengikut bulan',
 'Select a segment to view those applications.':'Pilih bahagian carta untuk melihat permohonan berkaitan.',
 'Applications sent per month':'Permohonan dihantar mengikut bulan','Applications submitted':'Permohonan dihantar',
 'Interview stage':'Peringkat temu duga','Offers received':'Tawaran diterima','application has progressed beyond the pending stage.':'permohonan telah melepasi peringkat dalam proses.',
 'applications have progressed beyond the pending stage.':'permohonan telah melepasi peringkat dalam proses.',
 'Search and filter every application you have sent.':'Cari dan tapis semua permohonan yang telah dihantar.',
 'Application list and filters':'Senarai permohonan dan penapis','Search company or role':'Cari syarikat atau jawatan',
 'Your applications':'Permohonan anda','Add and manage your internship applications.':'Tambah dan urus permohonan latihan industri anda.',
 'Export CSV':'Eksport CSV','Add application':'Tambah permohonan','All':'Semua','Applied':'Dihantar','Interview':'Temu duga','Offer':'Tawaran',
 'All companies':'Semua syarikat','All dates':'Semua tarikh','Newest first':'Terbaharu dahulu','Oldest first':'Terlama dahulu',
 'Company A to Z':'Syarikat A hingga Z','Follow-up soonest':'Tarikh susulan terdekat','Company':'Syarikat',
 'Company type':'Jenis syarikat','Role':'Jawatan','City':'Bandar','Date':'Tarikh','Follow-up':'Susulan','Status':'Status','Actions':'Tindakan',
 'Industry':'Industri','Applied date':'Tarikh permohonan',
 'Application details':'Butiran permohonan','Company type / industry':'Jenis syarikat / industri',
 'Application date':'Tarikh permohonan','Follow-up date':'Tarikh susulan','(optional)':'(pilihan)',
 'Set a reminder date; it will appear on your dashboard.':'Tetapkan tarikh peringatan untuk dipaparkan pada papan pemuka.',
 'Notes':'Catatan','Contact name, interview notes, or next steps':'Nama kenalan, nota temu duga atau langkah seterusnya',
 'Close':'Tutup','Save changes':'Simpan perubahan','View':'Lihat','Edit':'Sunting','Delete':'Padam','Not set':'Belum ditetapkan',
 'Search and filter companies':'Cari dan tapis syarikat','Browse partner companies and companies from your tracked applications.':'Terokai syarikat rakan kongsi dan syarikat dalam senarai permohonan anda.',
 'Filter by industry':'Tapis mengikut industri','Companies and tracked application details':'Syarikat dan butiran permohonan yang dijejak',
 'Bar chart of monthly allowance by company':'Carta bar elaun bulanan mengikut syarikat',
 'Search companies or locations':'Cari syarikat atau lokasi','All industries':'Semua industri',
 'Monthly allowance by company':'Elaun bulanan mengikut syarikat','Company & role details':'Butiran syarikat & jawatan',
 'Got it':'Faham','Open roles / allowance':'Jawatan tersedia / elaun','Open roles':'Jawatan tersedia',
 'Monthly allowance':'Elaun bulanan','Location':'Lokasi','Not listed':'Tiada maklumat','Explore roles':'Terokai jawatan',
 'Track an application':'Jejak permohonan','View applications':'Lihat permohonan','Your applications (':'Permohonan anda (',
 'No applications tracked yet.':'Belum ada permohonan yang dijejak.','Roles to explore':'Jawatan untuk diterokai',
 'No application tracked for this company yet.':'Belum ada permohonan untuk syarikat ini.',
 'Internship listings and allowance are not currently published.':'Senarai latihan industri dan maklumat elaun belum tersedia.',
 'Roles to explore':'Jawatan untuk diterokai','Your application':'Permohonan anda',
 'No companies match your search.':'Tiada syarikat sepadan dengan carian anda.',
 'Student':'Pelajar','Current student':'Pelajar semasa',
 'Add your contact details':'Tambah maklumat untuk dihubungi','Portfolio link not added':'Pautan portfolio belum ditambah',
 'Education':'Pendidikan','Undergraduate student':'Pelajar prasiswazah',
 'Malaysia · Current student':'Malaysia · Pelajar semasa',
 'Your workspace is ready':'Ruang kerja anda sedia','Let’s make your next move count.':'Mari rancang langkah seterusnya.',
 'Skills & interests':'Kemahiran & minat','Communication':'Komunikasi','Problem solving':'Penyelesaian masalah',
 'Teamwork':'Kerja berpasukan','Web design':'Reka bentuk web','Technology':'Teknologi','Learning':'Pembelajaran',
 'InternTrack help':'Bantuan InternTrack','Little helper':'Pembantu kecil','Pick a topic to get started':'Pilih topik untuk bermula',
 'Ask me':'Tanya saya','Open help questions':'Buka soalan bantuan','Close help':'Tutup bantuan',
 'What would you like help with?':'Apa yang anda perlukan bantuan?','All topics':'Semua topik',
 'Interviews & offers':'Temu duga & tawaran','Account & profile':'Akaun & profil','choose a question':'pilih soalan',
 'How do I add an application?':'Bagaimana saya menambah permohonan?',
 'Open Applications from the side menu, choose “Add application”, fill in the role and company details, then save.':'Buka Permohonan melalui menu sisi, pilih “Tambah permohonan”, isi butiran jawatan dan syarikat, kemudian simpan.',
 'How do I update an application status?':'Bagaimana saya mengemas kini status permohonan?',
 'In Applications, select Edit beside the company, choose the new status, and save your changes.':'Dalam Permohonan, pilih Sunting di sebelah syarikat, pilih status baharu dan simpan perubahan.',
 'Can I find a particular application?':'Bolehkah saya mencari permohonan tertentu?',
 'Use the search field for a company or role. You can also filter by status, company, or year.':'Gunakan ruangan carian untuk mencari syarikat atau jawatan. Anda juga boleh menapis mengikut status, syarikat atau tahun.',
 'How should I prepare for an interview?':'Bagaimana saya patut bersedia untuk temu duga?',
 'Review the role requirements, prepare a few examples of your work, and confirm the interview time and format with the company.':'Semak keperluan jawatan, sediakan beberapa contoh kerja anda dan sahkan masa serta format temu duga dengan syarikat.',
 'Where can I see my offer?':'Di manakah saya boleh melihat tawaran?',
 'Your offer appears in the dashboard summary and in Applications. Select the company name to see its date, role, and next-step reminder.':'Tawaran dipaparkan dalam ringkasan papan pemuka dan Permohonan. Pilih nama syarikat untuk melihat tarikh, jawatan dan peringatan seterusnya.',
 'How do I track a rejection?':'Bagaimana saya menjejak permohonan yang ditolak?',
 'Edit that application and set its status to Rejected. It stays in your records so you can review your application history.':'Sunting permohonan itu dan tetapkan status kepada Ditolak. Rekodnya kekal supaya anda boleh menyemak sejarah permohonan.',
 'Where can I find my resume?':'Di manakah saya boleh melihat resume saya?',
 'Choose My profile in the side menu to review your resume summary, education, skills, and internship applications.':'Pilih Profil saya pada menu sisi untuk menyemak ringkasan resume, pendidikan, kemahiran dan permohonan latihan industri anda.',
 'How do I switch themes?':'Bagaimana saya menukar suasana paparan?',
 'Use the theme button at the top of any portal page. Your preference is saved on this browser.':'Gunakan butang suasana di bahagian atas halaman. Pilihan anda disimpan dalam pelayar ini.',
 'Is my information stored online?':'Adakah maklumat saya disimpan dalam talian?',
 'This demo stores account and application data in this browser only. Avoid entering sensitive personal information.':'Demo ini menyimpan akaun dan permohonan dalam pelayar ini sahaja. Jangan masukkan maklumat peribadi yang sensitif.',
 'Enter both username and password.':'Masukkan nama pengguna dan kata laluan.',
 'Incorrect username or password. Try the demo login shown on this page.':'Nama pengguna atau kata laluan tidak betul. Cuba akaun demo pada halaman ini.',
 'Fill in your name and a username.':'Masukkan nama dan nama pengguna.',
 'Password needs at least 6 characters.':'Kata laluan mesti mempunyai sekurang-kurangnya 6 aksara.',
 'That username is taken. Choose another.':'Nama pengguna itu telah digunakan. Pilih nama lain.',
 'No applications match. Clear the search or filter.':'Tiada permohonan sepadan. Kosongkan carian atau penapis.',
 'No applications yet. Add your first application to get started.':'Belum ada permohonan. Tambah permohonan pertama anda untuk bermula.',
 'Application submitted; keep an eye on your email and follow up if needed.':'Permohonan dihantar; semak e-mel anda dan buat susulan jika perlu.',
 'You have an interview stage recorded; prepare examples and confirm the meeting details.':'Temu duga anda telah direkodkan; sediakan contoh kerja dan sahkan butiran pertemuan.',
 'You have an offer recorded; review the terms and respond before the deadline.':'Tawaran anda telah direkodkan; semak syarat dan jawab sebelum tarikh akhir.',
 'This application is marked rejected; you can review feedback and focus on the next opportunity.':'Permohonan ini ditandakan ditolak; semak maklum balas dan fokus pada peluang seterusnya.',
 'Internship search':'Pencarian latihan industri','No reminders yet. Add a follow-up date to an application to see it here.':'Belum ada peringatan. Tambah tarikh susulan pada permohonan untuk melihatnya di sini.',
 'Overdue':'Lewat','Follow-up':'Susulan','Application deleted.':'Permohonan dipadam.','Application added.':'Permohonan ditambah.',
 'Application updated.':'Permohonan dikemas kini.','Exported':'Dieksport','Open help':'Buka bantuan',
 '© 2026 InternTrack – IMS566 Individual Assignment':'© 2026 InternTrack – Tugasan Individu IMS566',
 'Built with Bootstrap 5 & Chart.js ·':'Dibina dengan Bootstrap 5 & Chart.js ·',
 'Log in | InternTrack':'Log masuk | InternTrack','Dashboard | InternTrack':'Papan pemuka | InternTrack',
 'Applications | InternTrack':'Permohonan | InternTrack','Companies | InternTrack':'Syarikat | InternTrack',
 'My profile | InternTrack':'Profil saya | InternTrack',
 'Sign in to InternTrack to organize internship applications, interviews, and offers in one simple dashboard.':'Log masuk ke InternTrack untuk mengurus permohonan latihan industri, temu duga dan tawaran dalam satu papan pemuka.',
 'Review internship application totals, upcoming interviews, progress, and monthly activity in your InternTrack dashboard.':'Semak jumlah permohonan latihan industri, temu duga akan datang, kemajuan dan aktiviti bulanan pada papan pemuka InternTrack.',
 'Search, organize, and update your internship applications by company, role, date, and status.':'Cari, susun dan kemas kini permohonan latihan industri mengikut syarikat, jawatan, tarikh dan status.',
 'Explore internship companies, view roles and allowance details, and track your applications.':'Terokai syarikat latihan industri, lihat butiran jawatan dan elaun serta jejak permohonan anda.',
 'View your InternTrack resume, education, skills, and tracked internship applications.':'Lihat resume InternTrack, pendidikan, kemahiran dan permohonan latihan industri yang dijejak.',
 'Search and filter every application you have sent.':'Cari dan tapis semua permohonan yang telah dihantar.',
 'Filter recent applications by status':'Tapis permohonan terkini mengikut status',
 'Filter by status':'Tapis mengikut status','Filter by company':'Tapis mengikut syarikat',
 'Filter by year':'Tapis mengikut tahun','Sort applications':'Susun permohonan',
 'View internship details at':'Lihat butiran latihan industri di','Workplace at':'Suasana tempat kerja di',
 'Energy':'Tenaga','Tech':'Teknologi','Telecom':'Telekomunikasi','Semiconductor':'Semikonduktor',
 'Finance':'Kewangan','E-commerce':'E-dagang','Aviation & Travel':'Penerbangan & Pelancongan',
 'Research & Development':'Penyelidikan & Pembangunan','Agriculture':'Pertanian','Business Services':'Perkhidmatan perniagaan',
 'Construction':'Pembinaan','Government':'Kerajaan','Healthcare':'Kesihatan','Hospitality':'Hospitaliti',
 'Logistics':'Logistik','Manufacturing':'Pembuatan','Media':'Media','Non-profit':'Bukan untung',
 'Public sector':'Sektor awam','Real Estate':'Hartanah','Retail':'Peruncitan','Other':'Lain-lain',
 'Export CSV':'Eksport CSV','e.g. Technology, Finance, Energy':'cth. Teknologi, Kewangan, Tenaga',
 'Monthly allowance (RM)':'Elaun bulanan (RM)','Applications sent':'Permohonan dihantar'
};
const MALAY_TO_ENGLISH=new Map(Object.entries(MALAY_TEXT).map(([english,malay])=>[malay,english]));
let currentLanguage=localStorage.getItem('it_language')==='ms'?'ms':'en';
const translationTextNodes=new WeakMap();
const translationAttributes=new WeakMap();
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function translateString(value,language=currentLanguage){
 const text=String(value),trimmed=text.trim();
 if(!trimmed)return text;
 let translated=language==='ms'?MALAY_TEXT[trimmed]||trimmed:MALAY_TO_ENGLISH.get(trimmed)||trimmed;
 if(translated===trimmed){
  let match=trimmed.match(/^Showing (\d+) applications?$/);
  if(match)translated=language==='ms'?`Memaparkan ${match[1]} permohonan`:`Showing ${match[1]} application${match[1]==='1'?'':'s'}`;
  match=trimmed.match(/^(\d+) of (\d+) shown$/);
  if(match)translated=language==='ms'?`${match[1]} daripada ${match[2]} dipaparkan`:`${match[1]} of ${match[2]} shown`;
  match=trimmed.match(/^Exported (\d+) applications? to CSV\.$/);
  if(match)translated=language==='ms'?`${match[1]} permohonan dieksport ke CSV.`:trimmed;
  match=trimmed.match(/^(\d+) applications? (?:has|have) progressed beyond the pending stage\.$/);
  if(match)translated=language==='ms'?`${match[1]} permohonan telah melepasi peringkat dalam proses.`:trimmed;
  match=trimmed.match(/^Delete the (.+) application\?$/);
  if(match)translated=language==='ms'?`Padam permohonan ${match[1]}?`:trimmed;
  match=trimmed.match(/^(View|Edit|Delete) (.+) application$/);
  if(match)translated=language==='ms'?`${({View:'Lihat',Edit:'Sunting',Delete:'Padam'})[match[1]]} permohonan ${match[2]}`:trimmed;
  match=trimmed.match(/^Show full details for (.+)$/);
  if(match)translated=language==='ms'?`Papar butiran penuh untuk ${match[1]}`:trimmed;
   match=trimmed.match(/^View (.+) application$/);
   if(match)translated=language==='ms'?`Lihat permohonan ${match[1]}`:trimmed;
   match=trimmed.match(/^Edit (.+) application$/);
   if(match)translated=language==='ms'?`Sunting permohonan ${match[1]}`:trimmed;
   match=trimmed.match(/^Delete (.+) application$/);
   if(match)translated=language==='ms'?`Padam permohonan ${match[1]}`:trimmed;
  match=trimmed.match(/^View internship details at (.+)$/);
  if(match)translated=language==='ms'?`Lihat butiran latihan industri di ${match[1]}`:trimmed;
  match=trimmed.match(/^Workplace at (.+)$/);
  if(match)translated=language==='ms'?`Suasana tempat kerja di ${match[1]}`:trimmed;
   match=trimmed.match(/^Your applications \((\d+)\)$/);
   if(match)translated=language==='ms'?`Permohonan anda (${match[1]})`:trimmed;
   match=trimmed.match(/^(\d+) listed internship openings; typical allowance RM (.+) per month\.$/);
   if(match)translated=language==='ms'?`${match[1]} jawatan latihan industri disenaraikan; elaun biasa RM ${match[2]} sebulan.`:trimmed;
   match=trimmed.match(/^More (.+) questions$/);
   if(match){
    const topic=match[1].charAt(0).toUpperCase()+match[1].slice(1);
    translated=language==='ms'?`Lagi soalan tentang ${translateString(topic,language)}`:trimmed;
   }
   match=trimmed.match(/^(.+): choose a question$/);
   if(match)translated=language==='ms'?`${translateString(match[1],language)}: pilih soalan`:trimmed;
  match=trimmed.match(/^(.+) · Applied (.+)$/);
  if(match)translated=language==='ms'?`${match[1]} · Dihantar pada ${match[2]}`:trimmed;
  match=trimmed.match(/^Follow up: (.+)$/);
  if(match)translated=language==='ms'?`Susulan: ${match[1]}`:trimmed;
  match=trimmed.match(/^(.+) · (.+)$/);
  if(match&&MALAY_TEXT[match[2]])translated=language==='ms'?`${match[1]} · ${MALAY_TEXT[match[2]]}`:trimmed;
 }
 return text.slice(0,text.indexOf(trimmed))+translated+text.slice(text.indexOf(trimmed)+trimmed.length);
}
function translateTextNode(node){
 const value=node.nodeValue||'',previous=translationTextNodes.get(node);
 const source=previous&&value===previous.rendered?previous.source:value;
 const rendered=translateString(source);
 translationTextNodes.set(node,{source,rendered});
 if(value!==rendered)node.nodeValue=rendered;
}
const localizedAttributes=['aria-label','title','placeholder','alt','content'];
function translateElementAttributes(element){
 let records=translationAttributes.get(element);
 if(!records){records=new Map();translationAttributes.set(element,records)}
 localizedAttributes.forEach(name=>{
  if(!element.hasAttribute(name))return;
  const value=element.getAttribute(name),previous=records.get(name);
  const source=previous&&value===previous.rendered?previous.source:value;
  const rendered=translateString(source);
  records.set(name,{source,rendered});
  if(value!==rendered)element.setAttribute(name,rendered);
 });
}
function translateSubtree(root){
 if(root.nodeType===Node.TEXT_NODE){translateTextNode(root);return}
 if(root.nodeType!==Node.ELEMENT_NODE&&root.nodeType!==Node.DOCUMENT_NODE)return;
 if(root.nodeType===Node.ELEMENT_NODE&&root.matches('script,style'))return;
 if(root.nodeType===Node.ELEMENT_NODE)translateElementAttributes(root);
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{
  acceptNode:node=>node.parentElement?.closest('script,style')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT
 });
 while(walker.nextNode())translateTextNode(walker.currentNode);
 if(root.querySelectorAll)root.querySelectorAll('*').forEach(translateElementAttributes);
}
function updateLanguageButtons(){
 document.querySelectorAll('#languageToggle,#loginLanguageToggle').forEach(button=>{
  const label=button.querySelector('span');
  if(label)label.textContent=currentLanguage==='en'?'BM':'EN';
  button.setAttribute('aria-label',currentLanguage==='en'?'Switch language to Bahasa Melayu':'Tukar bahasa ke English');
 });
}
function updateThemeButton(button){
 const dark=document.documentElement.dataset.theme==='dark';
 const mood=translateString(dark?'Daybreak':'Moonlight');
 button.innerHTML=`<i class="bi ${dark?'bi-sun':'bi-moon-stars'}" aria-hidden="true"></i><span>${mood}</span>`;
 button.setAttribute('aria-label',translateString(dark?'Switch to Daybreak mood':'Switch to Moonlight mood'));
}
function animateToggle(button){
 button.classList.remove('is-animating');
 void button.offsetWidth;
 button.classList.add('is-animating');
 window.setTimeout(()=>button.classList.remove('is-animating'),700);
}
function updateChartsForLanguage(){
 if(!window.Chart)return;
 Object.values(Chart.instances).forEach(chart=>{
  if(chart.$internTrackLabels)chart.data.labels=chart.$internTrackLabels.map(label=>translateString(label));
  if(chart.$internTrackDatasetLabels)chart.data.datasets.forEach((dataset,index)=>{
   dataset.label=translateString(chart.$internTrackDatasetLabels[index]);
  });
  chart.update('none');
 });
}
function setLanguage(language){
 currentLanguage=language==='ms'?'ms':'en';
 localStorage.setItem('it_language',currentLanguage);
 document.documentElement.lang=currentLanguage;
 translateSubtree(document.documentElement);
 updateLanguageButtons();
 document.querySelectorAll('#themeToggle,#loginThemeToggle').forEach(updateThemeButton);
 updateChartsForLanguage();
 document.dispatchEvent(new Event('interntrack:languagechange'));
}
function bindLanguageToggle(button){
 updateLanguageButtons();
 button.addEventListener('click',()=>{
  animateToggle(button);
  setLanguage(currentLanguage==='en'?'ms':'en');
 });
}
function bindThemeToggle(button){
 updateThemeButton(button);
 button.addEventListener('click',()=>{
  animateToggle(button);
  const dark=document.documentElement.dataset.theme!=='dark';
  document.documentElement.dataset.theme=dark?'dark':'light';
  localStorage.setItem('it_theme',dark?'dark':'light');
  updateThemeButton(button);
  if(window.Chart){
   const chartText=dark?'#edf4f1':'#596a65';
   Object.values(Chart.instances).forEach(chart=>{
    chart.options.color=chartText;
    if(chart.options.plugins?.legend?.labels)chart.options.plugins.legend.labels.color=chartText;
    Object.values(chart.scales).forEach(scale=>{scale.options.ticks.color=chartText;scale.options.grid.color=dark?'#354640':'#e4ebe7'});
    chart.update('none');
   });
  }
 });
}
function showEntryTransition(){
 if(sessionStorage.getItem('it_entry_transition')!=='1')return;
 sessionStorage.removeItem('it_entry_transition');
 const transition=document.createElement('div');
 transition.className='entry-transition';
 transition.setAttribute('role','status');
 transition.setAttribute('aria-live','polite');
 transition.innerHTML=`<div class="entry-transition-content"><span class="entry-transition-mark"><i class="bi bi-stars" aria-hidden="true"></i></span><strong>${translateString('Your workspace is ready')}</strong><span>${translateString('Let’s make your next move count.')}</span><div class="entry-progress"><span></span></div></div>`;
 document.body.append(transition);
 transition.addEventListener('animationend',event=>{
  if(event.target===transition&&event.animationName==='entry-screen-exit')transition.remove();
 });
}
function initializeLocalization(){
 document.documentElement.lang=currentLanguage;
 translateSubtree(document.documentElement);
 updateLanguageButtons();
 document.querySelectorAll('#themeToggle,#loginThemeToggle').forEach(updateThemeButton);
 const observer=new MutationObserver(records=>records.forEach(record=>{
  if(record.type==='characterData')translateTextNode(record.target);
  else if(record.type==='attributes')translateElementAttributes(record.target);
  else record.addedNodes.forEach(translateSubtree);
 }));
 observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:localizedAttributes});
}
const companyIndustry=name=>COMPANIES.find(company=>company.name.toLowerCase()===String(name).trim().toLowerCase())?.industry
 ||APPS.find(app=>app.industry&&app.company.toLowerCase()===String(name).trim().toLowerCase())?.industry||'';

// Auth
const DEMO_USER={user:'NurFatihah',pass:'ims566',name:'Nur Fatihah Binti Abdullah'};
const USERS=[DEMO_USER];
const getUsers=()=>USERS.concat(JSON.parse(localStorage.getItem('it_users')||'[]')); // registered users persist in browser
const session=()=>{
 const stored=JSON.parse(sessionStorage.getItem('it_session')||'null');
 if(stored&&(stored.user==='student'||stored.name==='Aina Sofea')){
  const migrated={user:DEMO_USER.user,name:DEMO_USER.name};
  sessionStorage.setItem('it_session',JSON.stringify(migrated));
  return migrated;
 }
 return stored;
};
const applicationStorageKey=user=>`it_applications_${encodeURIComponent(user)}`;
function loadApplications(){
 const me=session();
 if(!me)return APPS=[];
 const saved=localStorage.getItem(applicationStorageKey(me.user));
 if(saved!==null)APPS=JSON.parse(saved);
 else APPS=me.user===DEMO_USER.user?DEMO_APPS.map(app=>({...app})):[];
 APPS=APPS.map(app=>({...app,industry:app.industry||companyIndustry(app.company)||'Other',followUp:app.followUp||'',notes:app.notes||''}));
 return APPS;
}
function saveApplications(){
 const me=session();
 if(me)localStorage.setItem(applicationStorageKey(me.user),JSON.stringify(APPS));
}
const logout=()=>{sessionStorage.removeItem('it_session');location.href='index.html'};

// Shared layout 
function layout(active){
 const me=session(); if(!me){location.href='index.html';return;}
 const links=[['dashboard.html','Dashboard','bi-grid-1x2'],['applications.html','Applications','bi-briefcase'],['companies.html','Companies','bi-buildings'],['profile.html','My profile','bi-person-vcard']];
 const current=links.find(link=>link[0]===active)?.[1]||'Dashboard';
 const dark=localStorage.getItem('it_theme')==='dark';
 document.getElementById('nav').innerHTML=`
 <aside class="app-sidebar" id="appSidebar" aria-label="Side navigation">
  <a class="sidebar-brand" href="dashboard.html"><span class="brand-mark" aria-hidden="true"><i class="bi bi-stars"></i></span> InternTrack</a>
  <button class="sidebar-close" id="sidebarClose" type="button" aria-label="Close side menu"><i class="bi bi-x-lg" aria-hidden="true"></i></button>
  <p class="sidebar-label">WORKSPACE</p>
  <nav class="sidebar-links" aria-label="Main navigation">${links.map(l=>`<a class="nav-link ${l[0]===active?'active':''}" ${l[0]===active?'aria-current="page"':''} href="${l[0]}"><i class="bi ${l[2]}" aria-hidden="true"></i><span>${l[1]}</span></a>`).join('')}</nav>
  <a class="sidebar-profile" href="profile.html"><img class="profile-avatar" src="assets/nur-fatihah.jpeg" alt=""><span><strong>${escapeHTML(me.name)}</strong><small>View profile</small></span><i class="bi bi-arrow-up-right" aria-hidden="true"></i></a>
 </aside>
 <div class="site-topbar">
  <button class="sidebar-toggle" id="sidebarToggle" type="button" aria-label="Open side menu" aria-controls="appSidebar" aria-expanded="false"><i class="bi bi-list" aria-hidden="true"></i></button>
  <span class="topbar-greeting">Hi, <strong>${escapeHTML(me.name)}</strong></span>
  <div class="topbar-actions">
   <button class="btn btn-language" id="languageToggle" type="button" aria-label="Switch language to Bahasa Melayu"><i class="bi bi-translate" aria-hidden="true"></i><span>${currentLanguage==='en'?'BM':'EN'}</span></button>
   <button class="btn btn-theme" id="themeToggle" type="button"><i class="bi ${dark?'bi-sun':'bi-moon-stars'}" aria-hidden="true"></i><span></span></button>
   <button class="btn btn-logout" type="button" onclick="logout()"><i class="bi bi-box-arrow-right" aria-hidden="true"></i><span>Log out</span></button>
  </div>
 </div>
 <div class="breadcrumbs-wrap"><div class="container"><nav aria-label="Breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="dashboard.html">Home</a></li><li class="breadcrumb-item active" aria-current="page">${current}</li></ol></nav></div></div>`;
 document.getElementById('footer').innerHTML=`
 <footer class="site-footer"><div class="container d-flex flex-wrap justify-content-between align-items-center gap-2">
  <p>&copy; 2026 InternTrack &ndash; IMS566 Individual Assignment</p>
  <p>Built with Bootstrap 5 &amp; Chart.js &middot; <a href="https://github.com/" target="_blank" rel="noopener">GitHub</a></p></div></footer>
 <div class="toast-container position-fixed bottom-0 end-0 p-3"><div id="appToast" class="toast border-0" role="status" aria-live="polite" aria-atomic="true"><div class="toast-body d-flex align-items-center gap-2"><i class="bi bi-check-circle-fill text-success" aria-hidden="true"></i><span id="toastMessage"></span></div></div></div>`;
 document.documentElement.dataset.theme=dark?'dark':'light';
 bindThemeToggle(document.getElementById('themeToggle'));
 bindLanguageToggle(document.getElementById('languageToggle'));
 document.getElementById('sidebarToggle').addEventListener('click',()=>{
  const mobile=window.matchMedia('(max-width: 899.98px)').matches;
  const className=mobile?'sidebar-open':'sidebar-collapsed';
  const open=document.body.classList.toggle(className);
  document.getElementById('sidebarToggle').setAttribute('aria-expanded',String(mobile?open:!open));
  document.getElementById('sidebarToggle').setAttribute('aria-label',open?(mobile?'Close side menu':'Hide side menu'):'Open side menu');
 });
 document.getElementById('sidebarClose').addEventListener('click',()=>{
  document.body.classList.remove('sidebar-open');
  document.getElementById('sidebarToggle').setAttribute('aria-expanded','false');
  document.getElementById('sidebarToggle').setAttribute('aria-label','Open side menu');
 });
 document.addEventListener('click',event=>{
  if(event.target.closest('.company-detail-trigger')){
   const trigger=event.target.closest('.company-detail-trigger');
   const wasOpen=trigger.classList.contains('is-open');
   document.querySelectorAll('.company-detail-trigger.is-open').forEach(item=>item.classList.remove('is-open'));
   if(!wasOpen)trigger.classList.add('is-open');
  }else if(!event.target.closest('.company-hover-card'))document.querySelectorAll('.company-detail-trigger.is-open').forEach(item=>item.classList.remove('is-open'));
 });
 initHelpBot();
 showEntryTransition();
}
const countBy=k=>APPS.reduce((o,a)=>(o[a[k]]=(o[a[k]]||0)+1,o),{});
function companyDetailMarkup(app){
 const step={Applied:'Application submitted; keep an eye on your email and follow up if needed.',Interview:'You have an interview stage recorded; prepare examples and confirm the meeting details.',Offer:'You have an offer recorded; review the terms and respond before the deadline.',Rejected:'This application is marked rejected; you can review feedback and focus on the next opportunity.'};
 return `<span class="company-hover-wrap"><button class="company-detail-trigger" type="button" aria-label="Show full details for ${escapeHTML(app.company)}">${escapeHTML(app.company)}</button><span class="company-hover-card" role="tooltip"><strong>${escapeHTML(app.company)}</strong><span>${escapeHTML(app.role)} &middot; ${escapeHTML(app.industry||'Other')}</span><span>${escapeHTML(app.city)} &middot; Applied ${escapeHTML(app.date)}</span>${app.followUp?`<span><i class="bi bi-bell" aria-hidden="true"></i> Follow up: ${escapeHTML(app.followUp)}</span>`:''}<span class="badge-st ${BADGE[app.status]||BADGE.Applied}">${escapeHTML(app.status)}</span><span>${step[app.status]||'Application status details.'}</span>${app.notes?`<span class="application-note-preview">${escapeHTML(app.notes)}</span>`:''}</span></span>`;
}
function showToast(message){
 const toast=document.getElementById('appToast');
 if(!toast)return;
 document.getElementById('toastMessage').textContent=message;
 bootstrap.Toast.getOrCreateInstance(toast).show();
}

// Login / Register Page
function initLogin(){
 const dark=localStorage.getItem('it_theme')==='dark';
 document.documentElement.dataset.theme=dark?'dark':'light';
 const themeButton=document.getElementById('loginThemeToggle');
 bindThemeToggle(themeButton);
 bindLanguageToggle(document.getElementById('loginLanguageToggle'));
 const loginVideo=document.querySelector('.login-video');
 if(loginVideo&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)loginVideo.pause();
 if(session()){location.href='dashboard.html';return;}
 const err=document.getElementById('err'), show=m=>{err.textContent=m;err.classList.remove('d-none')};
 document.getElementById('lu').value=DEMO_USER.user;
 document.getElementById('lp').value=DEMO_USER.pass;
 document.querySelectorAll('.password-toggle').forEach(button=>button.addEventListener('click',()=>{
  const field=document.getElementById(button.dataset.passwordTarget);
  const visible=field.type==='password';
  field.type=visible?'text':'password';
  button.setAttribute('aria-pressed',String(visible));
  button.setAttribute('aria-label',visible?'Hide password':'Show password');
  button.innerHTML=`<i class="bi bi-eye${visible?'-slash':''}" aria-hidden="true"></i>`;
 }));
 document.getElementById('loginForm').addEventListener('submit',e=>{
  e.preventDefault();
  const u=document.getElementById('lu').value.trim(),p=document.getElementById('lp').value;
  if(!u||!p) return show('Enter both username and password.');
  const found=getUsers().find(x=>x.user===u&&x.pass===p);
  if(!found) return show('Incorrect username or password. Try the demo login shown on this page.');
  sessionStorage.setItem('it_session',JSON.stringify({user:found.user,name:found.name}));
  sessionStorage.setItem('it_entry_transition','1');
  location.href='dashboard.html';
 });
 document.getElementById('regForm').addEventListener('submit',e=>{
  e.preventDefault();
  const list=JSON.parse(localStorage.getItem('it_users')||'[]');
  const name=document.getElementById('rn').value.trim();
  const username=document.getElementById('ru').value.trim();
  const password=document.getElementById('rp').value;
  if(!name||!username) return show('Fill in your name and a username.');
  if(password.length<6) return show('Password needs at least 6 characters.');
  if(getUsers().some(x=>x.user.toLowerCase()===username.toLowerCase())) return show('That username is taken. Choose another.');
  list.push({user:username,pass:password,name});
  localStorage.setItem('it_users',JSON.stringify(list));
  localStorage.setItem(applicationStorageKey(username),'[]');
  err.classList.add('d-none');
  document.getElementById('ok').classList.remove('d-none');
  document.querySelector('[data-bs-target="#tabLogin"]').click();
 });
}

// Dashboard 
function initDashboard(){
 layout('dashboard.html');
 const me=session();
 loadApplications();
 const now=new Date();
 const greeting=now.getHours()<12?'Good morning':now.getHours()<18?'Good afternoon':'Good evening';
 document.getElementById('dashboardName').textContent=me.name;
 document.getElementById('dashboardGreeting').textContent=greeting+',';
 const renderDashboardDate=()=>document.getElementById('dashboardDate').textContent=now.toLocaleDateString(currentLanguage==='ms'?'ms-MY':'en-MY',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
 renderDashboardDate();
 document.addEventListener('interntrack:languagechange',renderDashboardDate);
 const c=countBy('status');
 document.getElementById('stats').innerHTML=[
  ['All','Total applications',APPS.length,'s-total','bi-briefcase'],['Applied','Pending',c.Applied||0,'s2','bi-hourglass-split'],['Interview','Interviews',c.Interview||0,'s3','bi-calendar2-check'],['Offer','Offers',c.Offer||0,'s4','bi-award'],['Rejected','Rejected',c.Rejected||0,'s5','bi-x-circle']
 ].map(s=>`<a class="panel stat stat-link ${s[3]}" href="applications.html${s[0]==='All'?'':'?status='+s[0]}" aria-label="View ${s[1].toLowerCase()}"><span class="stat-icon"><i class="bi ${s[4]}" aria-hidden="true"></i></span><span><span class="num">${s[2]}</span><span class="stat-label">${s[1]}</span><span class="stat-hint">View details <i class="bi bi-arrow-right" aria-hidden="true"></i></span></span></a>`).join('');
 const recentFilter=document.getElementById('recentFilter');
 const renderRecent=()=>{
  const filtered=APPS.filter(app=>recentFilter.value==='All'||app.status===recentFilter.value)
   .sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);
  document.getElementById('recentCount').textContent=`Showing ${filtered.length} ${filtered.length===1?'application':'applications'}`;
  document.getElementById('recentBody').innerHTML=filtered.length?filtered.map(app=>`<tr><td>${companyDetailMarkup(app)}</td><td>${escapeHTML(app.industry)}</td><td>${escapeHTML(app.role)}</td><td><span class="badge-st ${BADGE[app.status]}">${escapeHTML(app.status)}</span></td></tr>`).join(''):'<tr><td colspan="4"><div class="empty-state"><i class="bi bi-inbox" aria-hidden="true"></i>No applications in this stage yet.</div></td></tr>';
 };
 recentFilter.addEventListener('change',renderRecent);
 renderRecent();
 const today=new Date(),todayISO=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
 const followUps=APPS.filter(app=>app.followUp).sort((a,b)=>a.followUp.localeCompare(b.followUp));
 const interviewWithoutDate=APPS.filter(app=>app.status==='Interview'&&!app.followUp);
 const trackerItems=followUps.map(app=>`<a class="tracker-item tracker-link ${app.followUp<todayISO?'is-overdue':''}" href="applications.html?company=${encodeURIComponent(app.company)}"><i class="bi ${app.followUp<todayISO?'bi-exclamation-circle':'bi-calendar-event'}" aria-hidden="true"></i><span><strong>${escapeHTML(app.company)}</strong><span class="small">${escapeHTML(app.role)} &middot; ${app.followUp<todayISO?'Overdue':'Follow-up'} ${escapeHTML(app.followUp)}</span>${app.notes?`<span class="tracker-note">${escapeHTML(app.notes)}</span>`:''}</span><i class="bi bi-arrow-up-right tracker-arrow" aria-hidden="true"></i></a>`).join('');
 const interviewItems=interviewWithoutDate.map(app=>`<div class="tracker-item"><i class="bi bi-chat-square-text" aria-hidden="true"></i><div><strong>${escapeHTML(app.company)}</strong><div class="small text-muted">Interview stage &middot; Add a follow-up date in Applications to set a reminder.</div></div></div>`).join('');
 document.getElementById('upcomingList').innerHTML=trackerItems+interviewItems||'<div class="empty-state"><i class="bi bi-calendar2-check" aria-hidden="true"></i>No reminders yet. Add a follow-up date to an application to see it here.</div>';
 const progress=document.getElementById('progressOverview');
 const completed=(c.Interview||0)+(c.Offer||0);
 const progressItems=[['Applications submitted',APPS.length,APPS.length],['Interview stage',c.Interview||0,APPS.length],['Offers received',c.Offer||0,APPS.length]];
 progress.innerHTML=progressItems.map(item=>`<div class="mb-3"><div class="d-flex justify-content-between gap-2 mb-2"><span>${item[0]}</span><strong>${item[1]}${item[2]===APPS.length&&item[0]==='Applications submitted'?'':' / '+item[2]}</strong></div><div class="progress" role="progressbar" aria-label="${item[0]}" aria-valuenow="${item[1]}" aria-valuemin="0" aria-valuemax="${Math.max(item[2],1)}"><div class="progress-bar" style="width:${Math.min(100,item[1]/Math.max(item[2],1)*100)}%"></div></div></div>`).join('')+`<p class="small mb-0">${completed} application${completed===1?' has':'s have'} progressed beyond the pending stage.</p>`;
 const statusLabels=Object.keys(c);
 const statusChart=new Chart(document.getElementById('statusChart'),{type:'doughnut',
  data:{labels:statusLabels,datasets:[{data:Object.values(c),backgroundColor:statusLabels.map(k=>COLORS[k])}]},
  options:{maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},onClick:(event,elements)=>{
   if(elements.length)location.href=`applications.html?status=${encodeURIComponent(statusLabels[elements[0].index])}`;
  }}});
 statusChart.$internTrackLabels=statusLabels;
 updateChartsForLanguage();
 const m={};APPS.forEach(a=>{const k=a.date.slice(0,7);m[k]=(m[k]||0)+1});
 const keys=Object.keys(m).sort();
 const monthChart=new Chart(document.getElementById('monthChart'),{type:'bar',
  data:{labels:keys,datasets:[{label:'Applications sent',data:keys.map(k=>m[k]),backgroundColor:'#1b5360'}]},
  options:{maintainAspectRatio:false,scales:{y:{beginAtZero:true,ticks:{stepSize:1}}}}});
 monthChart.$internTrackDatasetLabels=['Applications sent'];
 updateChartsForLanguage();
}

// Applications
function initApplications(){
 layout('applications.html');
 loadApplications();
 const searchInput=document.getElementById('search');
 const statusFilter=document.getElementById('filter');
 const companyFilter=document.getElementById('companyFilter');
 const dateFilter=document.getElementById('dateFilter');
 const sortSelect=document.getElementById('sort');
 const tbody=document.getElementById('tbody');
 const count=document.getElementById('count');
 const industryInput=document.getElementById('appIndustry');
 const companyInput=document.getElementById('appCompany');
 const industryList=document.getElementById('companyTypes');
 industryList.innerHTML=INDUSTRIES.map(industry=>`<option value="${escapeHTML(industry)}"></option>`).join('');
 const refreshFilters=()=>{
  const selectedCompany=companyFilter.value, selectedYear=dateFilter.value;
  companyFilter.innerHTML='<option value="All">All companies</option>';
  dateFilter.innerHTML='<option value="All">All dates</option>';
  [...new Set(APPS.map(app=>app.company))].sort().forEach(name=>companyFilter.add(new Option(name,name)));
  [...new Set(APPS.map(app=>app.date.slice(0,4)))].sort().reverse().forEach(year=>dateFilter.add(new Option(year,year)));
  if([...companyFilter.options].some(option=>option.value===selectedCompany))companyFilter.value=selectedCompany;
  if([...dateFilter.options].some(option=>option.value===selectedYear))dateFilter.value=selectedYear;
 };
 refreshFilters();
 const params=new URLSearchParams(location.search);
 const requestedCompany=params.get('company');
 if(requestedCompany)searchInput.value=requestedCompany;
 const requestedStatus=params.get('status');
 if(['Applied','Interview','Offer','Rejected'].includes(requestedStatus))statusFilter.value=requestedStatus;
 const modal=new bootstrap.Modal(document.getElementById('applicationModal'));
 const statusClass=status=>BADGE[status]||BADGE.Applied;
 const filteredApplications=()=>{
  const q=searchInput.value.trim().toLowerCase();
  const rows=APPS.filter(app=>(statusFilter.value==='All'||app.status===statusFilter.value)
    &&(companyFilter.value==='All'||app.company===companyFilter.value)
    &&(dateFilter.value==='All'||app.date.startsWith(dateFilter.value))
    &&(app.company+' '+app.industry+' '+app.role+' '+app.city+' '+app.followUp+' '+app.notes).toLowerCase().includes(q));
  if(sortSelect.value==='oldest')rows.sort((a,b)=>a.date.localeCompare(b.date));
  else if(sortSelect.value==='company')rows.sort((a,b)=>a.company.localeCompare(b.company));
  else if(sortSelect.value==='followup')rows.sort((a,b)=>(a.followUp||'9999-12-31').localeCompare(b.followUp||'9999-12-31'));
  else rows.sort((a,b)=>b.date.localeCompare(a.date));
  return rows;
 };
 const draw=()=>{
  const rows=filteredApplications();
  tbody.innerHTML=rows.length?rows.map(app=>`<tr><td>${companyDetailMarkup(app)}</td><td>${escapeHTML(app.industry)}</td><td>${escapeHTML(app.role)}</td><td>${escapeHTML(app.city)}</td><td>${escapeHTML(app.date)}</td><td>${app.followUp?escapeHTML(app.followUp):'<span class="text-muted">Not set</span>'}</td>
   <td><span class="badge-st ${statusClass(app.status)}">${escapeHTML(app.status)}</span></td><td><div class="application-actions"><button class="btn btn-outline-secondary" type="button" data-action="view" data-id="${app.id}" aria-label="View ${escapeHTML(app.company)} application"><i class="bi bi-eye" aria-hidden="true"></i> View</button><button class="btn btn-outline-primary" type="button" data-action="edit" data-id="${app.id}" aria-label="Edit ${escapeHTML(app.company)} application"><i class="bi bi-pencil" aria-hidden="true"></i> Edit</button><button class="btn btn-outline-danger" type="button" data-action="delete" data-id="${app.id}" aria-label="Delete ${escapeHTML(app.company)} application"><i class="bi bi-trash" aria-hidden="true"></i> Delete</button></div></td></tr>`).join('')
   :`<tr><td colspan="8"><div class="empty-state"><i class="bi bi-${APPS.length?'search':'briefcase'}" aria-hidden="true"></i>${APPS.length?'No applications match. Clear the search or filter.':'No applications yet. Add your first application to get started.'}</div></td></tr>`;
  count.textContent=rows.length+' of '+APPS.length+' shown';
 };
 const openApplication=(app,editing)=>{
  const creating=!app;
  const details=app||{company:'',industry:'',role:'',city:'',date:'',followUp:'',notes:'',status:'Applied'};
  document.getElementById('applicationModalTitle').textContent=creating?'Add application':editing?'Edit application':'Application details';
  document.getElementById('appId').value=app?app.id:'';
  companyInput.value=details.company;
  industryInput.value=details.industry;
  document.getElementById('appRole').value=details.role;
  document.getElementById('appCity').value=details.city;
  document.getElementById('appDate').value=details.date;
  document.getElementById('appFollowUp').value=details.followUp||'';
  document.getElementById('appNotes').value=details.notes||'';
  document.getElementById('appStatus').value=details.status;
  companyInput.readOnly=!creating;
  industryInput.readOnly=!editing;
  document.getElementById('appRole').readOnly=!editing;
  document.getElementById('appCity').readOnly=!editing;
  document.getElementById('appDate').readOnly=!editing;
  document.getElementById('appFollowUp').readOnly=!editing;
  document.getElementById('appNotes').readOnly=!editing;
  document.getElementById('appStatus').disabled=!editing;
  document.getElementById('saveApplication').classList.toggle('d-none',!editing);
  document.getElementById('saveApplication').textContent=creating?'Add application':'Save changes';
  modal.show();
 };
 companyInput.addEventListener('change',()=>{
  if(document.getElementById('appId').value)return;
  industryInput.value=companyIndustry(companyInput.value);
 });
 document.getElementById('addApplication').addEventListener('click',()=>openApplication(null,true));
 document.getElementById('exportApplications').addEventListener('click',()=>{
  const rows=filteredApplications();
  const fields=[['Company','company'],['Industry','industry'],['Role','role'],['City','city'],['Applied date','date'],['Follow-up date','followUp'],['Status','status'],['Notes','notes']];
  const csvCell=value=>{
   const text=String(value??'');
   return `"${(/^[=+\-@\t\r]/.test(text)?`'${text}`:text).replace(/"/g,'""')}"`;
  };
  const csv=[fields.map(field=>csvCell(translateString(field[0]))).join(','),...rows.map(app=>fields.map(field=>csvCell(app[field[1]])).join(','))].join('\r\n');
  const blob=new Blob(['\uFEFF',csv],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob),link=document.createElement('a');
  link.href=url;
  const now=new Date(),date=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  link.download=`interntrack-applications-${date}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),0);
  showToast(`Exported ${rows.length} application${rows.length===1?'':'s'} to CSV.`);
 });
 const newCompany=params.get('newCompany');
 if(newCompany){
  openApplication(null,true);
  companyInput.value=newCompany;
  industryInput.value=params.get('industry')||companyIndustry(newCompany);
 }
 [searchInput,statusFilter,companyFilter,dateFilter,sortSelect].forEach(control=>control.addEventListener(control===searchInput?'input':'change',draw));
 tbody.addEventListener('click',event=>{
  const button=event.target.closest('button[data-action]');
  if(!button)return;
  const index=APPS.findIndex(app=>app.id===Number(button.dataset.id));
  if(index<0)return;
  const app=APPS[index];
  if(button.dataset.action==='view')openApplication(app,false);
  if(button.dataset.action==='edit')openApplication(app,true);
  if(button.dataset.action==='delete'&&confirm(translateString(`Delete the ${app.company} application?`))){
   APPS.splice(index,1);
   saveApplications();
   draw();
   showToast('Application deleted.');
  }
 });
 document.getElementById('applicationForm').addEventListener('submit',event=>{
  event.preventDefault();
  const id=document.getElementById('appId').value;
  let app=APPS.find(item=>item.id===Number(id));
  const creating=!id;
  if(creating)app={id:APPS.reduce((max,item)=>Math.max(max,item.id),0)+1};
  if(!app)return;
  app.company=companyInput.value.trim();
  app.industry=industryInput.value.trim();
  app.role=document.getElementById('appRole').value.trim();
  app.city=document.getElementById('appCity').value.trim();
  app.date=document.getElementById('appDate').value;
  app.followUp=document.getElementById('appFollowUp').value;
  app.notes=document.getElementById('appNotes').value.trim();
  app.status=document.getElementById('appStatus').value;
  if(creating){
   APPS.push(app);
   searchInput.value='';
   statusFilter.value='All';
   companyFilter.value='All';
   dateFilter.value='All';
   refreshFilters();
  }
  saveApplications();
  modal.hide();
  draw();
  showToast(creating?'Application added.':'Application updated.');
 });
 draw();
}

// Companies
function initCompanies(){
 layout('companies.html');
 loadApplications();
 const searchInput=document.getElementById('companySearch');
 const industryFilter=document.getElementById('industryFilter');
 const companyList=()=>{
  const tracked=APPS.reduce((groups,app)=>{
   const key=app.company.trim().toLowerCase();
   if(!groups[key])groups[key]=[];
   groups[key].push(app);
   return groups;
  },{});
  const companies=COMPANIES.map(company=>({...company,applications:tracked[company.name.toLowerCase()]||[]}));
  Object.keys(tracked).forEach(key=>{
   if(!companies.some(company=>company.name.toLowerCase()===key)){
    const applications=tracked[key];
    companies.push({name:applications[0].company,industry:applications[0].industry,city:applications[0].city,allowance:null,open:null,applications});
   }
  });
  return companies.map(company=>({...company,industry:company.industry||company.applications[0]?.industry||'Other'}));
 };
 const companies=companyList();
 [...new Set(companies.map(company=>company.industry))].sort().forEach(industry=>industryFilter.add(new Option(industry,industry)));
 const render=()=>{
  const query=searchInput.value.trim().toLowerCase();
  const visibleCompanies=companies.filter(company=>(industryFilter.value==='All'||company.industry===industryFilter.value)
   &&(company.name+' '+company.industry+' '+company.city+' '+company.applications.map(app=>app.role).join(' ')).toLowerCase().includes(query));
  document.getElementById('grid').innerHTML=visibleCompanies.length?visibleCompanies.map(company=>{
   const name=escapeHTML(company.name),industry=escapeHTML(company.industry),city=escapeHTML(company.city);
   const tracked=company.applications;
   const image=company.image||'assets/companies/petronas.jpg';
   const trackedMarkup=tracked.length?`<div class="company-tracking"><strong>Your applications (${tracked.length})</strong><ul class="company-application-list">${tracked.map(app=>`<li><span>${escapeHTML(app.role)}</span><span class="badge-st ${BADGE[app.status]||BADGE.Applied}">${escapeHTML(app.status)}</span></li>`).join('')}</ul></div>`:'<p class="small text-muted mb-0">No applications tracked yet.</p>';
   const listing=company.open===null?'<div class="company-meta"><span>Open roles / allowance</span><strong>Not listed</strong></div>':`<div class="company-meta"><span>Open roles</span><strong>${company.open}</strong></div><div class="company-meta"><span>Monthly allowance</span><strong>RM ${company.allowance.toLocaleString()}</strong></div>`;
   return `<article class="panel company-card">
   <button class="company-photo-button" type="button" data-company="${escapeHTML(company.name)}" aria-label="View internship details at ${name}"><img class="company-photo" src="${image}" alt="Workplace at ${name}" loading="lazy"><span class="photo-hint"><i class="bi bi-plus-circle" aria-hidden="true"></i> Explore roles</span></button>
   <div class="company-card-top"><span class="company-avatar" aria-hidden="true">${escapeHTML(company.name.charAt(0))}</span><div><h2>${name}</h2><p><span class="company-type">${industry}</span> &middot; ${city}</p></div></div>
   ${listing}
   <div class="company-meta"><span>Location</span><strong>${city}</strong></div>
   ${trackedMarkup}
   <a class="btn btn-outline-primary mt-auto" href="applications.html?newCompany=${encodeURIComponent(company.name)}&amp;industry=${encodeURIComponent(company.industry)}"><i class="bi bi-plus-lg" aria-hidden="true"></i> Track an application</a>
   ${tracked.length?`<a class="btn btn-link" href="applications.html?company=${encodeURIComponent(company.name)}"><i class="bi bi-list-ul" aria-hidden="true"></i> View applications</a>`:''}
  </article>`;
  }).join(''):'<div class="panel empty-state"><i class="bi bi-buildings" aria-hidden="true"></i>No companies match your search.</div>';
 };
 searchInput.addEventListener('input',render);
 industryFilter.addEventListener('change',render);
 document.getElementById('grid').addEventListener('click',event=>{
  const button=event.target.closest('.company-photo-button');
  if(!button)return;
  const company=companies.find(item=>item.name===button.dataset.company);
  if(!company)return;
  const applications=company.applications.length?company.applications.map(app=>`<li><strong>${escapeHTML(app.role)}</strong> <span class="badge-st ${BADGE[app.status]||BADGE.Applied}">${escapeHTML(app.status)}</span></li>`).join(''):'';
  const roles=(company.roles||company.applications.map(app=>app.role)).map(role=>`<li>${escapeHTML(role)}</li>`).join('');
  document.getElementById('companyDetailBody').innerHTML=`<p><strong>${escapeHTML(company.industry)}</strong> &middot; ${escapeHTML(company.city)}</p><p>${company.open===null?'Internship listings and allowance are not currently published.':`${company.open} listed internship openings; typical allowance RM ${company.allowance.toLocaleString()} per month.`}</p><h3 class="h6">Roles to explore</h3><ul>${roles}</ul>${applications?`<h3 class="h6 mt-3">Your applications</h3><ul>${applications}</ul>`:'<p>No application tracked for this company yet.</p>'}`;
  bootstrap.Modal.getOrCreateInstance(document.getElementById('companyDetailModal')).show();
 });
 render();
 const allowanceCompanies=companies.filter(company=>company.allowance!==null);
 const allowanceChart=new Chart(document.getElementById('allowChart'),{type:'bar',
  data:{labels:allowanceCompanies.map(c=>c.name),datasets:[{label:'Monthly allowance (RM)',data:allowanceCompanies.map(c=>c.allowance),backgroundColor:'#2A9D8F'}]},
  options:{maintainAspectRatio:false,indexAxis:'y',plugins:{legend:{display:false}}}});
 allowanceChart.$internTrackDatasetLabels=['Monthly allowance (RM)'];
 updateChartsForLanguage();
}

function initProfile(){
 layout('profile.html');
 loadApplications();
 const me=session();
 const parts=me.name.trim().split(/\s+/);
 document.getElementById('profileName').textContent=me.name;
 const profileInitials=document.getElementById('profileInitials');
 if(profileInitials)profileInitials.textContent=parts.map(part=>part[0]).join('').slice(0,2).toUpperCase();
 const profileUser=document.getElementById('profileUser');
 if(profileUser)profileUser.textContent='@'+me.user;
 const counts=countBy('status');
 document.getElementById('profileApplications').textContent=APPS.length;
 document.getElementById('profileOffers').textContent=counts.Offer||0;
 document.getElementById('profileInterviews').textContent=counts.Interview||0;
 document.getElementById('resumeApplications').innerHTML=APPS.length?APPS.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(app=>`<li><div><strong>${escapeHTML(app.role)}</strong><span>${escapeHTML(app.company)} &middot; ${escapeHTML(app.date)}</span></div><span class="badge-st ${BADGE[app.status]||BADGE.Applied}">${escapeHTML(app.status)}</span></li>`).join(''):'<li class="empty-state">Your tracked applications will appear here as experience.</li>';
}

function initHelpBot(){
 const questions={
  'Applications':{
   'How do I add an application?':'Open Applications from the side menu, choose “Add application”, fill in the role and company details, then save.',
   'How do I update an application status?':'In Applications, select Edit beside the company, choose the new status, and save your changes.',
   'Can I find a particular application?':'Use the search field for a company or role. You can also filter by status, company, or year.'
  },
  'Interviews & offers':{
   'How should I prepare for an interview?':'Review the role requirements, prepare a few examples of your work, and confirm the interview time and format with the company.',
   'Where can I see my offer?':'Your offer appears in the dashboard summary and in Applications. Select the company name to see its date, role, and next-step reminder.',
   'How do I track a rejection?':'Edit that application and set its status to Rejected. It stays in your records so you can review your application history.'
  },
  'Account & profile':{
   'Where can I find my resume?':'Choose My profile in the side menu to review your resume summary, education, skills, and internship applications.',
   'How do I switch themes?':'Use the theme button at the top of any portal page. Your preference is saved on this browser.',
   'Is my information stored online?':'This demo stores account and application data in this browser only. Avoid entering sensitive personal information.'
  }
 };
 if(document.getElementById('helpWidget'))return;
 document.body.insertAdjacentHTML('beforeend',`<section class="help-widget" id="helpWidget" aria-label="InternTrack help"><div class="help-panel" id="helpPanel" hidden><div class="help-panel-head"><div><strong><i class="bi bi-stars" aria-hidden="true"></i> Little helper</strong><small>Pick a topic to get started</small></div><button class="help-close" type="button" aria-label="Close help"><i class="bi bi-x-lg" aria-hidden="true"></i></button></div><div class="help-content" id="helpContent"></div></div><button class="help-launcher" id="helpLauncher" type="button" aria-label="Open help questions" aria-expanded="false"><i class="bi bi-chat-heart-fill" aria-hidden="true"></i><span>Ask me</span></button></section>`);
 const panel=document.getElementById('helpPanel'),content=document.getElementById('helpContent'),launcher=document.getElementById('helpLauncher');
 const home=()=>{content.innerHTML=`<p>What would you like help with?</p>${Object.keys(questions).map(topic=>`<button class="help-choice" type="button" data-topic="${escapeHTML(topic)}">${escapeHTML(topic)}<i class="bi bi-chevron-right" aria-hidden="true"></i></button>`).join('')}`};
 home();
 launcher.addEventListener('click',event=>{if(launcher.dataset.dragged==='true'){delete launcher.dataset.dragged;event.preventDefault();return}panel.hidden=!panel.hidden;launcher.setAttribute('aria-expanded',String(!panel.hidden))});
 document.querySelector('.help-close').addEventListener('click',()=>{panel.hidden=true;launcher.setAttribute('aria-expanded','false')});
 content.addEventListener('click',event=>{
  const topic=event.target.closest('[data-topic]'),question=event.target.closest('[data-question]');
  if(question){const title=question.dataset.topic,text=question.dataset.question;content.innerHTML=`<button class="help-back" type="button" data-topic="${escapeHTML(title)}"><i class="bi bi-arrow-left" aria-hidden="true"></i> More ${escapeHTML(title.toLowerCase())} questions</button><div class="help-answer"><strong>${escapeHTML(text)}</strong><p>${escapeHTML(questions[title][text])}</p></div>`;return}
  if(topic){const title=topic.dataset.topic;content.innerHTML=`<button class="help-back" type="button"><i class="bi bi-arrow-left" aria-hidden="true"></i> All topics</button><p>${escapeHTML(title)}: choose a question</p>${Object.keys(questions[title]).map(text=>`<button class="help-choice" type="button" data-question="${escapeHTML(text)}" data-topic="${escapeHTML(title)}">${escapeHTML(text)}<i class="bi bi-chevron-right" aria-hidden="true"></i></button>`).join('')}`;return}
  if(event.target.closest('.help-back')){const back=event.target.closest('.help-back');if(back.dataset.topic){const title=back.dataset.topic;content.innerHTML=`<button class="help-back help-home" type="button"><i class="bi bi-arrow-left" aria-hidden="true"></i> All topics</button><p>${escapeHTML(title)}: choose a question</p>${Object.keys(questions[title]).map(text=>`<button class="help-choice" type="button" data-question="${escapeHTML(text)}" data-topic="${escapeHTML(title)}">${escapeHTML(text)}<i class="bi bi-chevron-right" aria-hidden="true"></i></button>`).join('')}`}else home()}
 });
 let dragging=false,moved=false,offsetX=0,offsetY=0;
 launcher.addEventListener('pointerdown',event=>{dragging=true;moved=false;const rect=launcher.getBoundingClientRect();offsetX=event.clientX-rect.left;offsetY=event.clientY-rect.top;launcher.setPointerCapture(event.pointerId)});
 launcher.addEventListener('pointermove',event=>{if(!dragging)return;if(Math.abs(event.movementX)+Math.abs(event.movementY)>2)moved=true;if(moved){const x=Math.max(8,Math.min(innerWidth-launcher.offsetWidth-8,event.clientX-offsetX));const y=Math.max(8,Math.min(innerHeight-launcher.offsetHeight-8,event.clientY-offsetY));const widget=document.getElementById('helpWidget');widget.style.left=x+'px';widget.style.top=y+'px';widget.style.right='auto';widget.style.bottom='auto'}});
 launcher.addEventListener('pointerup',()=>{dragging=false;if(moved)launcher.dataset.dragged='true'});
}

initializeLocalization();
