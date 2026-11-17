/* ---- p58：姓名庫擴充：台灣百大姓氏（依人口比例）、依世代的常見名字，以及各國姓名 ---- */
/* 姓氏：前十大依內政部統計排序（陳林黃張李王吳劉蔡楊，合計占 52.79%；前一百大占 96.62%）；各姓比例為估計，11–100 名的順序為概略。 */
(function(){
 const top=[['陳',11.1],['林',8.3],['黃',6.0],['張',5.3],['李',5.1],['王',3.8],['吳',3.7],['劉',3.3],['蔡',3.1],['楊',2.9]];
 const rest='許鄭謝郭洪曾邱廖賴徐周葉蘇莊呂江何蕭羅高潘簡朱鍾彭游詹胡施沈余盧梁趙顏柯翁魏孫戴范方宋鄧杜傅侯曹薛丁卓阮馬董唐溫藍蔣石古紀姚連馮歐程湯田康姜白汪鄒尤巫黎涂龔嚴韓袁金童陸柳邵錢伍倪'.split('');
 const raw=rest.map((c,i)=>[c,Math.exp(-i*.05)]),tot=raw.reduce((a,x)=>a+x[1],0),w=raw.map(x=>[x[0],x[1]/tot*43.8]);
 SUR.length=0;top.concat(w).forEach(([c,p])=>{const n=Math.max(1,Math.round(p*10));for(let i=0;i<n;i++)SUR.push(c)});
})();
const SURC=['歐陽','范姜','張簡','諸葛','司馬','上官','司徒','夏侯','皇甫','慕容'];
/* 名字：依出生年代（1960 前／60–70 年代／80 年代／90 年代／2000 年代／2010 年後）*/
const NMFIX=[
 [['金龍','文雄','志明','建國','明德','清木','文彬','振豐','俊雄','國棟','添財','明輝','進財','水生','志雄','正雄','榮輝','文祥','信義','永昌'],['秀英','淑貞','美玲','麗華','淑惠','秀蘭','玉蘭','月娥','金枝','素珍','秀珠','寶珠','淑芬','碧雲','玉珍','美珠','秀鳳','麗珠','雪梅','春嬌']],
 [['志明','俊傑','建宏','志豪','志偉','文雄','家豪','俊宏','信宏','聰明','建志','正義','志強','明哲','宗憲','俊賢','建良','志成','健智','進德'],['淑芬','淑惠','美玲','雅婷','美惠','麗華','淑娟','淑貞','怡君','淑華','惠雯','靜宜','雅惠','怡萍','雅雯','秀玲','佩君','淑慧','麗君','玉婷']],
 [['家豪','志豪','冠宇','建宏','俊傑','柏翰','志偉','宗翰','彥廷','俊宏','承翰','冠廷','柏宏','宇軒','信宏','哲瑋','建志','培軒','家銘','俊豪'],['雅婷','怡君','雅雯','佳穎','怡婷','欣怡','宜庭','淑芬','雅玲','惠婷','佩珊','怡萱','詩涵','靜怡','思妤','婉如','宜蓁','怡婷','筱涵','家瑜']],
 [['承翰','冠宇','柏翰','宇軒','家豪','冠霖','彥廷','哲瑋','品睿','柏宇','子謙','宗翰','冠廷','奕辰','承恩','宥廷','柏諺','承峰','俊廷','宇翔'],['怡君','雅婷','欣妤','佩珊','詩涵','宜蓁','怡萱','郁婷','品妍','思穎','語彤','紫晴','心怡','姿穎','雅筑','宜庭','詠晴','子晴','佳穎','書瑜']],
 [['承恩','宥廷','品睿','承翰','冠宇','柏諺','宇翔','子謙','奕辰','宸睿','柏睿','翊誠','品叡','子睿','宥丞','郁翔','睿恩','宇辰','柏宇','昱翔'],['宜蓁','欣妤','詩涵','品妍','子晴','怡萱','品妤','詠晴','語彤','苡菲','雨霏','芷晴','宥蓁','品潔','予安','姵彤','恩慈','巧妍','紫涵','語晴']],
 [['承恩','恩碩','宥廷','子睿','品睿','昱辰','柏睿','睿恩','子謙','宸睿','禹辰','品叡','奕辰','宥丞','翊安','予辰','承澔','亦辰','聿廷','睿翔'],['詠晴','子晴','品妍','苡菲','雨霏','芷晴','宥蓁','梓妍','語安','沐恩','苡安','芮安','予彤','品璇','知恩','思妍','苡晴','禾恩','靖妍','宥菲']]
];
/* 組合用字（依世代，男／女）：第一字、第二字 */
const NMCH=[
 {M:['建志文國明俊金正宗信清振永榮進','雄明國偉豪傑宏成輝龍富順德彬祥賢強昌'],F:['淑美秀麗玉月惠素雅靜怡碧春','芬惠玲華英娟貞蘭珍珠雯君萍婷鳳梅']},
 {M:['志俊建家信宗文明正聰國','豪傑宏偉明成賢良強德哲維誠銘'],F:['淑美雅怡惠靜佩秀麗玉宜婉','芬惠玲婷君雯萍娟慧珊如瑜儀']},
 {M:['冠柏宇家俊承彥哲信宗建','宇翰軒豪廷瑋宏銘翔霖賢傑'],F:['雅怡佳欣宜惠佩思婉筱靜家','婷君穎怡庭玲珊妤蓁涵瑜萱']},
 {M:['承冠柏宇彥品子奕宥宗家','翰宇軒霖廷睿謙辰翔瑋豪恩諺'],F:['欣詩宜怡品語紫佳心雅郁思','妤涵蓁萱妍彤晴穎婷筑瑜庭']},
 {M:['承宥品子柏宸翊昱睿冠宇','恩廷睿翰辰翔丞澤賢安宏諺'],F:['宜欣詩品子詠怡雨苡芷語宥','蓁妤涵妍晴萱菲霏彤安瑜瑄']},
 {M:['承恩子品昱柏宸禹予亦聿睿','碩睿辰廷安澔翔恩宇丞熙諺'],F:['詠子品苡雨芷宥梓語沐芮予','晴妍菲霏安蓁彤恩璇涵瑄熙']}
];
const NMEraOf=by=>by<1960?0:by<1980?1:by<1990?2:by<2000?3:by<2010?4:5;
function nmBirth(by){if(by!=null)return by;try{return calYear()-S.age}catch(e){return 1995}}
function twGiven(g,by){const e=NMEraOf(nmBirth(by)),m=g==='男',r=Math.random();
 if(r<.016)return pick(m?['傑','杰','毅','豪','宏','偉','勇','安']:['敏','梅','雪','玲','婷','琳','娟','芳']);
 if(!m&&r<.03)return pick(['婷','玲','莉','安','欣','涵','潔','妮','晴','萱']).repeat(2);
 if(r<.5)return pick(NMFIX[e][m?0:1]);
 const C=NMCH[e][m?'M':'F'],a=pick(C[0].split('')),b=pick(C[1].split('').filter(x=>x!==a));return a+b}
given=function(g,by){return twGiven(g,by)};
fullName=function(g,by){return (chance(.012)?pick(SURC):pick(SUR))+given(g,by)};
/* 父母名字依其出生世代重新取名 */
const _ng58=newGame;newGame=function(name,sx){_ng58(name,sx);try{const y=calYear(),sur=S.name[0];if(S.mom)S.mom.n=sur+given('女',y-(S.mom.off||28));if(S.dad)S.dad.n=sur+given('男',y-(S.dad.off||30))}catch(e){}};
/* 各國姓名：在原有基礎上擴充 */
function nmAdd(k,o){const p=NM[k];if(!p)return;['s','M','F'].forEach(x=>{(o[x]||'').split(',').filter(Boolean).forEach(n=>{if(!p[x].includes(n))p[x].push(n)})})}
nmAdd('jp',{s:'佐々木,山口,松本,井上,木村,林,齋藤,清水,山崎,森,池田,橋本,阿部,石川,山下,中島,石井,小林,前田,藤田,小川,岡田,後藤,長谷川,村上,近藤,石田,遠藤,青木,坂本,斉藤,福田,太田,西村,藤井,三浦,岡本,松田,中川,原田,小野',M:'蓮,大和,湊,樹,悠真,陽斗,律,朝陽,蒼,悠斗,隼人,海斗,颯太,優太,和也,直樹,誠,浩二,裕太,雄大,修平,勇気,亮,慎吾,剛',F:'凜,紬,結菜,莉子,詩,芽依,澪,陽葵,咲良,愛,美優,由美子,恵子,裕子,真由美,千尋,七海,彩,遥,春香,舞,真央,萌,優花,瞳'});
nmAdd('kr',{s:'尹,張,林,韓,吳,申,徐,權,黃,安,宋,洪,全,高,文,孫,梁,裴,白,曹,許,劉,南,沈,盧',M:'道允,夏俊,柱元,宇振,時宇,志豪,俊昊,聖敏,在賢,泰民,東賢,英洙,相哲,仁成,志勳,承浩,鎮宇,賢俊',F:'瑞妍,夏琳,秀雅,智秀,敏智,藝琳,恩智,允雅,惠敏,美英,淑子,英愛,貞淑,珠賢,多恩,素妍,藝瑟'});
nmAdd('en',{s:'Anderson,Thomas,Jackson,White,Harris,Martin,Thompson,Moore,Young,Allen,King,Wright,Scott,Hill,Green,Adams,Baker,Nelson,Carter,Mitchell,Roberts,Turner,Phillips,Campbell,Parker,Evans,Edwards,Collins,Stewart,Morris,Murphy,Cook,Rogers,Morgan,Cooper,Peterson,Reed,Bailey,Bell,Howard,Ward,Cox,Richardson,Wood,Watson,Brooks,Bennett,Gray,James,Hughes',M:'James,William,Henry,Benjamin,Alexander,Samuel,Joseph,Matthew,Andrew,Thomas,Ryan,Nathan,Joshua,Tyler,Aaron,Kevin,Brian,Eric,Jason,Adam,Owen,Isaac,Caleb,Max,George,Harry,Charlie,Oscar,Leo,Theodore',F:'Charlotte,Amelia,Isabella,Ava,Abigail,Emily,Ella,Elizabeth,Sofia,Avery,Scarlett,Victoria,Lily,Zoe,Natalie,Hailey,Lucy,Evie,Isla,Ruby,Freya,Poppy,Rachel,Megan,Lauren,Jessica,Ashley,Samantha,Katherine,Alice'});
nmAdd('de',{s:'Schneider,Meyer,Hoffmann,Schulz,Koch,Bauer,Richter,Klein,Wolf,Schröder,Neumann,Schwarz,Zimmermann,Braun,Krüger,Hofmann,Hartmann,Lange,Schmitt,Werner,Krause,Meier,Lehmann,Schmid,Schulze,Maier,Köhler,Herrmann,König,Walter',M:'Maximilian,Elias,Noah,Finn,Ben,Niklas,Tim,Jan,Moritz,Tobias,Florian,Stefan,Thomas,Michael,Andreas,Markus,Matthias,Sebastian,Philipp,Henrik,Jakob,Emil',F:'Sophie,Marie,Hannah,Emilia,Lea,Johanna,Katharina,Julia,Sarah,Lisa,Nina,Sabine,Petra,Claudia,Ursula,Birgit,Greta,Frieda,Charlotte,Ida'});
nmAdd('vn',{s:'Hoàng,Huỳnh,Phan,Vũ,Võ,Đặng,Bùi,Đỗ,Hồ,Ngô,Dương,Lý',M:'Anh,Bảo,Cường,Đức,Hải,Khoa,Long,Nam,Phúc,Quang,Sơn,Thành,Tuấn,Việt,Hiếu,Hoàng',F:'Linh,Ngọc,Phương,Thảo,Trang,Vy,Yến,Hà,Hằng,Thu,Nhung,Quỳnh,Chi,Oanh,Trâm'});
nmAdd('id',{s:'Setiawan,Saputra,Kusuma,Nugroho,Putra,Gunawan,Lestari,Susanto,Hakim,Rahman,Siregar,Nasution,Simanjuntak,Hutapea,Permana,Firmansyah',M:'Andi,Rizky,Dimas,Fajar,Yoga,Bayu,Hendra,Joko,Wahyu,Rudi,Arif,Dedi,Teguh,Ilham,Reza',F:'Ayu,Putri,Sari,Wulan,Intan,Lestari,Fitri,Indah,Rahma,Nia,Yuni,Tri,Maya,Citra,Dian'});
nmAdd('ph',{s:'Mendoza,Torres,Flores,Villanueva,Ramos,Bautista,Aquino,Castillo,Dela Cruz,Gonzales,Rivera,Fernandez,Lopez,Soriano,Navarro',M:'Juan,Angelo,Carlo,Rommel,Jericho,Nico,Miguel,John Paul,Renz,Dennis,Allan,Ramon,Joshua,Kenneth',F:'Rose,Jasmine,Kristine,Jenny,Mary Grace,Aileen,Liza,Carla,Bea,Angelica,Ma. Cristina,Princess,Nicole,Cherry'});
nmAdd('th',{s:'Chaiyaporn,Suksai,Phromma,Boonmee,Saetang,Thongchai,Rattanakul,Wattana,Kaewmanee,Prasert,Siriwan',M:'Prasit,Chaiwat,Narong,Weerapong,Thanakorn,Arthit,Nattapong,Sarawut,Korn,Pichai,Teerapat',F:'Ploy,Mali,Siriporn,Kanya,Nittaya,Ratchanee,Warunee,Araya,Pimpa,Fon,Nok'});
nmAdd('sgm',{s:'bin Abdullah,bin Ahmad,bin Yusof,binti Ali,binti Mohamed,bin Omar,binti Ibrahim,bin Hamid',M:'Muhammad,Haziq,Irfan,Amir,Zulkifli,Syafiq,Danial,Aiman,Hakim',F:'Nurul,Farah,Aliah,Zahra,Amirah,Siti,Liyana,Hidayah,Sofea'});
nmAdd('sgi',{s:'Sharma,Iyer,Menon,Krishnan,Subramaniam,Rajan,Gopal,Naidu,Chandran',M:'Karthik,Suresh,Ravi,Mohan,Ganesh,Prakash,Siva,Dinesh',F:'Lakshmi,Meena,Kavitha,Revathi,Sangeetha,Malathi,Deepa,Shanti'});
nmAdd('es',{s:'Pérez,Sánchez,Ramírez,Torres,Flores,Rivera,Gómez,Díaz,Reyes,Morales,Cruz,Ortiz,Gutiérrez,Chávez,Ramos,Vargas,Castillo,Jiménez,Moreno,Romero,Álvarez,Ruiz,Mendoza,Aguilar,Herrera',M:'Juan,Alejandro,Javier,Fernando,Pablo,Andrés,Sergio,Ricardo,Manuel,Jorge,Mateo,Santiago,Daniel,Rafael,Eduardo,Antonio,Francisco,Héctor',F:'Isabella,Ximena,Mariana,Daniela,Paula,Gabriela,Carmen,Ana,Laura,Patricia,Valeria,Andrea,Elena,Rosa,Alejandra,Fernanda,Natalia,Claudia'});
nmAdd('fr',{s:'Richard,Durand,Leroy,Simon,Michel,Lefebvre,Garcia,David,Bertrand,Roux,Vincent,Fournier,Morel,Girard,André,Mercier,Dupont,Lambert,Bonnet,François,Martinez,Legrand,Garnier,Faure,Rousseau',M:'Gabriel,Raphaël,Arthur,Jules,Maxime,Théo,Thomas,Alexandre,Pierre,Julien,Mathieu,Baptiste,Clément,Romain,Étienne,Olivier,Paul',F:'Louise,Jade,Alice,Inès,Zoé,Julie,Sophie,Marie,Claire,Amélie,Margaux,Océane,Juliette,Élodie,Pauline,Charlotte,Anaïs'});
nmAdd('pt',{s:'Ferreira,Rodrigues,Alves,Lima,Gomes,Ribeiro,Carvalho,Almeida,Lopes,Soares,Fernandes,Vieira,Barbosa,Rocha,Dias,Nunes,Martins,Araújo,Cardoso,Teixeira',M:'Miguel,Arthur,Heitor,Davi,Bernardo,Thiago,Felipe,Gustavo,Bruno,Diogo,Tiago,Henrique,Leonardo,Vitor,Eduardo,Guilherme,Marcelo,Ricardo',F:'Helena,Alice,Laura,Manuela,Valentina,Sofia,Isabella,Mariana,Fernanda,Camila,Carolina,Letícia,Bianca,Amanda,Gabriela,Joana,Inês'});
nmAdd('it',{s:'Conti,Gallo,Costa,Fontana,Moretti,Marino,Greco,Bruno,Giordano,Lombardi,Barbieri,Ricci,Colombo,Rizzo,De Luca,Ferrara,Santoro,Mariani,Rinaldi,Caruso',M:'Leonardo,Francesco,Alessandro,Lorenzo,Davide,Riccardo,Simone,Federico,Antonio,Giuseppe,Stefano,Paolo,Roberto,Tommaso,Gabriele,Edoardo,Emanuele',F:'Aurora,Alice,Martina,Giorgia,Beatrice,Alessia,Valentina,Federica,Silvia,Paola,Elisa,Ilaria,Roberta,Cristina,Laura,Anna,Greta'});
nmAdd('ru',{s:'Volkov,Fedorov,Morozov,Novikov,Kozlov,Lebedev,Semenov,Egorov,Pavlov,Stepanov,Nikolaev,Orlov,Andreev,Makarov,Zaitsev,Borisov,Yakovlev,Grigoriev,Romanov,Vorobyov',M:'Mikhail,Andrey,Alexey,Pavel,Vladimir,Evgeny,Maxim,Artem,Igor,Boris,Anton,Roman,Denis,Kirill,Oleg,Viktor,Nikolai',F:'Ekaterina,Tatiana,Irina,Svetlana,Maria,Daria,Polina,Yulia,Anastasia,Oksana,Galina,Ksenia,Vera,Lyudmila,Alina,Sofia'});
nmAdd('ar',{s:'Al-Mansour,Nasser,Saleh,Mahmoud,Abdallah,Haddad,Aziz,Said,Khoury,Mustafa,Sulaiman,Younis,Qasim,Al-Amin,Darwish,Jaber,Masri,Sabbagh,Zahran,Farouk',M:'Mohammed,Hassan,Khalid,Tariq,Samir,Walid,Hamza,Bilal,Nabil,Faisal,Mahmoud,Ibrahim,Mustafa,Zaid,Adel,Rami,Saeed',F:'Mariam,Zainab,Huda,Nadia,Rania,Leila,Dalia,Hana,Yasmin,Samira,Aya,Mona,Reem,Jana,Dina,Lina,Sara'});
nmAdd('tr',{s:'Arslan,Doğan,Kılıç,Aslan,Çetin,Kara,Koç,Kurt,Özdemir,Yıldız,Yıldırım,Öztürk,Şimşek,Polat,Güneş,Acar,Erdoğan,Bulut,Korkmaz,Aksoy',M:'Ahmet,Ali,Hasan,Hüseyin,Murat,Kemal,Yusuf,Ömer,Eren,Berk,Cem,Selim,Kaan,Serkan,Onur,Barış,Ozan',F:'Fatma,Emine,Hatice,Özge,Selin,Ebru,Gül,Büşra,Deniz,Esra,Seda,Sibel,Aylin,Nur,Melek,Yasemin,İpek'});
nmAdd('hi',{s:'Gupta,Verma,Mishra,Yadav,Joshi,Kapoor,Mehta,Nair,Rao,Iyer,Banerjee,Chatterjee,Mukherjee,Bose,Roy,Ahmed,Ali,Hussain,Chowdhury,Jain,Malhotra,Agarwal,Bhat,Kulkarni,Desai',M:'Aarav,Rohit,Sanjay,Ajay,Vijay,Manoj,Suresh,Deepak,Anil,Rajesh,Sachin,Karan,Ravi,Sandeep,Faisal,Hasan,Rafiq,Kamal,Nirmal',F:'Anjali,Pooja,Kavita,Sneha,Divya,Meera,Lakshmi,Shreya,Ritu,Sunita,Aisha,Fatima,Nasrin,Rina,Mala,Sita,Radha,Geeta'});
nmAdd('afr',{s:'Adeyemi,Osei,Boateng,Mutua,Otieno,Kamau,Ndlovu,Dlamini,Khumalo,Traoré,Camara,Bello,Okonkwo,Eze,Tesfaye,Hailu,Kiplagat,Banda,Tembo,Mbeki',M:'Kofi,Emeka,Tunde,Seun,Kelvin,Brian,Sipho,Tendai,Musa,Ibrahim,Samuel,Daniel,Abel,Yohannes,Mulugeta,Kwesi,Ousmane',F:'Abena,Chioma,Folake,Wanjiru,Akinyi,Thandi,Nomsa,Fatou,Mariama,Blessing,Grace,Selam,Tigist,Esi,Adaeze,Zanele,Naledi'});
nmAdd('slv',{s:'Kowalski,Wiśniewski,Wójcik,Kamiński,Lewandowski,Zieliński,Dvořák,Svoboda,Černý,Procházka,Jovanović,Nikolić,Marković,Horváth,Ivanov,Georgiev,Shevchenko,Bondarenko,Kovalenko,Tkachenko',M:'Tomasz,Paweł,Michał,Marek,Jakub,Lukáš,Ondřej,Nikola,Stefan,Dragan,Bogdan,Taras,Oleksandr,Dmytro,Zoran,Ivo',F:'Katarzyna,Agnieszka,Magdalena,Barbora,Tereza,Jelena,Milica,Ana,Nataliya,Oksana,Svitlana,Dragana,Zuzana,Petra,Mirela,Yuliya'});
nmAdd('nor',{s:'Larsen,Olsen,Pedersen,Kristiansen,Eriksson,Karlsson,Lindberg,Nilsson,Lehtonen,Korhonen,Mäkinen,Laine,Berg,Haugen,Holm,Svensson,Persson,Gustafsson,Mattsson,Mets',M:'Magnus,Oskar,William,Emil,Mathias,Jens,Henrik,Olaf,Mikko,Juha,Matti,Anders,Kasper,Rasmus,Gustav,Sven,Tarmo',F:'Ida,Astrid,Linnea,Maja,Emma,Sofie,Hanna,Aino,Helmi,Kirsi,Liisa,Marit,Signe,Karin,Saga,Sigrid,Kadri'});
nmAdd('eur',{s:'Kovács,Szabó,Tóth,Varga,Popa,Constantin,Dumitrescu,Jansen,Bakker,Visser,Smit,Mulder,Dimitriou,Nikolaidis,Vasiliou,Kowalczyk,Peeters,Janssens,Maes,Jacobs,Ivanov,Horváth,Marinescu,Stan',M:'Bence,Gábor,Zoltán,Mihai,Alexandru,Daan,Sem,Thijs,Giannis,Dimitris,Kostas,Stefan,Jan,Lars,Mathijs,Emil',F:'Zsófia,Anna,Réka,Elena,Andreea,Emma,Sanne,Femke,Eleni,Sofia,Katerina,Julia,Lotte,Noor,Mirela,Dora'});
