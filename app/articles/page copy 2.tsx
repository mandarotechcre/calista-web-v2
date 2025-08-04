// "use client"

// import { PrivateRoute } from "@/components/private-route"
// import { Navigation } from "@/components/layout/navigation"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { BookOpen, Calendar, Clock, AlertTriangle, Droplets, Heart } from "lucide-react"

// export default function ArticlesPage() {
//   return (
//     <PrivateRoute>
//       <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
//         <Navigation />

//         {/* Header */}
//         <header className="bg-white shadow-sm border-b">
//           <div className="container mx-auto px-4 py-6">
//             <div className="flex items-center gap-3">
//               <BookOpen className="h-8 w-8 text-emerald-600" />
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Panduan Lengkap Hukum Darah</h1>
//                 <p className="text-gray-600">Haid, Nifas, dan Istihadah dalam Islam</p>
//               </div>
//             </div>
//           </div>
//         </header>

//         <div className="container mx-auto px-4 py-8">
//           <div className="grid lg:grid-cols-4 gap-8">
//             {/* Sidebar Navigation */}
//             <div className="lg:col-span-1">
//               <Card className="sticky top-4">
//                 <CardHeader>
//                   <CardTitle className="text-lg">Daftar Isi</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ScrollArea className="h-96">
//                     <nav className="space-y-2">
//                       <a
//                         href="#latar-belakang"
//                         className="block text-sm text-blue-600 hover:text-blue-800 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
//                       >
//                         1. Latar Belakang
//                       </a>
//                       <a
//                         href="#jenis-darah"
//                         className="block text-sm text-blue-600 hover:text-blue-800 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
//                       >
//                         2. Jenis Darah dari Farji
//                       </a>
//                       <a
//                         href="#pengertian-haid"
//                         className="block text-sm text-blue-600 hover:text-blue-800 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
//                       >
//                         3. Pengertian Haid
//                       </a>
//                       <a
//                         href="#usia-haid"
//                         className="block text-sm text-blue-600 hover:text-blue-800 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
//                       >
//                         4. Usia Minimal Haid
//                       </a>
//                       <a
//                         href="#masa-haid"
//                         className="block text-sm text-blue-600 hover:text-blue-800 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
//                       >
//                         5. Masa Haid
//                       </a>
//                       <a
//                         href="#sifat-darah"
//                         className="block text-sm text-blue-600 hover:text-blue-800 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
//                       >
//                         6. Sifat Darah Haid
//                       </a>
//                       <a
//                         href="#haid-terputus"
//                         className="block text-sm text-blue-600 hover:text-blue-800 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
//                       >
//                         7. Haid Terputus-putus
//                       </a>
//                       <a
//                         href="#larangan"
//                         className="block text-sm text-blue-600 hover:text-blue-800 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
//                       >
//                         8. Hal yang Diharamkan
//                       </a>
//                       <a
//                         href="#istihadah"
//                         className="block text-sm text-blue-600 hover:text-blue-800 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
//                       >
//                         9. Macam-macam Istihadah
//                       </a>
//                       <a
//                         href="#solat-istihadah"
//                         className="block text-sm text-blue-600 hover:text-blue-800 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
//                       >
//                         10. Tata Cara Solat Istihadah
//                       </a>
//                       <a
//                         href="#mandi-wajib"
//                         className="block text-sm text-blue-600 hover:text-blue-800 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
//                       >
//                         11. Tata Cara Mandi Wajib
//                       </a>
//                     </nav>
//                   </ScrollArea>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Main Content */}
//             <div className="lg:col-span-3 space-y-8">
//               {/* Latar Belakang */}
//               <Card id="latar-belakang">
//                 <CardHeader>
//                   <div className="flex items-center gap-2">
//                     <Heart className="h-5 w-5 text-red-500" />
//                     <CardTitle className="text-xl">Latar Belakang</CardTitle>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="prose max-w-none">
//                   <p className="text-gray-700 leading-relaxed">
//                     Perempuan dan laki-laki wajib tahu terhadap aturan hukum darah Haid, Nifas dan Istihadoh. Karena
//                     seorang istri adalah amanah dari Allah SWT bagi suaminya. Jika tidak benar dalam mengurus istri maka
//                     suami akan terbawa celaka dihadapan Allah SWT.
//                   </p>
//                   <p className="text-gray-700 leading-relaxed">
//                     Masalah haid ada hubungannya dengan bab solat, bab puasa, bab bersuci, bab talaq dan bab iddah. Jika
//                     tidak tahu aturannya maka tidak bisa mengatur akan kedudukan hukumnya.
//                   </p>
//                 </CardContent>
//               </Card>

//               {/* Jenis Darah */}
//               <Card id="jenis-darah">
//                 <CardHeader>
//                   <div className="flex items-center gap-2">
//                     <Droplets className="h-5 w-5 text-red-500" />
//                     <CardTitle className="text-xl">Darah yang Keluar dari Farji Wanita</CardTitle>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid md:grid-cols-3 gap-4 mb-6">
//                     <Card className="border-red-200">
//                       <CardHeader className="pb-3">
//                         <Badge variant="destructive" className="w-fit">
//                           HAID
//                         </Badge>
//                       </CardHeader>
//                       <CardContent>
//                         <p className="text-sm text-gray-600">
//                           Darah yang keluar dari pangkal rahim (endometrium) dalam kondisi normal pada waktu-waktu
//                           tertentu.
//                         </p>
//                       </CardContent>
//                     </Card>

//                     <Card className="border-blue-200">
//                       <CardHeader className="pb-3">
//                         <Badge variant="secondary" className="w-fit bg-blue-100 text-blue-800">
//                           NIFAS
//                         </Badge>
//                       </CardHeader>
//                       <CardContent>
//                         <p className="text-sm text-gray-600">
//                           Darah yang keluar setelah rahim kosong dari kelahiran, walaupun yang keluar segumpal darah
//                           (alaqoh) atau daging (mudgoh).
//                         </p>
//                       </CardContent>
//                     </Card>

//                     <Card className="border-yellow-200">
//                       <CardHeader className="pb-3">
//                         <Badge variant="secondary" className="w-fit bg-yellow-100 text-yellow-800">
//                           ISTIHADAH
//                         </Badge>
//                       </CardHeader>
//                       <CardContent>
//                         <p className="text-sm text-gray-600">
//                           Darah yang keluar dari leher rahim (serviks) diluar masa haid dan Nifas disebabkan penyakit.
//                         </p>
//                       </CardContent>
//                     </Card>
//                   </div>

//                   <div className="bg-blue-50 p-4 rounded-lg">
//                     <h4 className="font-semibold text-blue-900 mb-2">Masa Nifas:</h4>
//                     <ul className="space-y-1 text-sm text-blue-800">
//                       <li>
//                         • <strong>Masa minimal:</strong> setetes
//                       </li>
//                       <li>
//                         • <strong>Masa umumnya/galibnya:</strong> 40 Hari
//                       </li>
//                       <li>
//                         • <strong>Masa maximal:</strong> 60 Hari
//                       </li>
//                     </ul>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Pengertian Haid */}
//               <Card id="pengertian-haid">
//                 <CardHeader>
//                   <CardTitle className="text-xl">Pengertian Haid</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-gray-700 leading-relaxed mb-4">
//                     Haid adalah darah yang keluar dari farji seorang wanita yang sudah mencapai usia minimal haid. Usia
//                     minimal haid wanita yaitu 9 tahun Hijriyah kurang 16 hari (kurang sedikit) dan keluar secara alami
//                     (tabi'atne) wanita bukan karena melahirkan atau karena penyakit pada rahimnya.
//                   </p>

//                   <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
//                     <h4 className="font-semibold text-green-900 mb-2">Hadits Nabi:</h4>
//                     <div className="text-center mb-2">
//                       <p className="text-lg font-arabic text-green-800">اذا بلغت الجارية تسع سنين فهي امرأة</p>
//                     </div>
//                     <p className="text-sm text-green-700 italic">
//                       Artinya: "Apabila seorang wanita muda telah mencapai usia 9 tahun maka dia adalah seorang dewasa."
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Usia Haid */}
//               <Card id="usia-haid">
//                 <CardHeader>
//                   <div className="flex items-center gap-2">
//                     <Calendar className="h-5 w-5 text-purple-500" />
//                     <CardTitle className="text-xl">Menanggapi Masalah Usia Haid</CardTitle>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <p className="text-gray-700">
//                       Minimal usia seorang wanita bisa mengeluarkan darah Haid adalah: usia 9 tahun hitungan Hijriyah,
//                       sehingga kalau ada seorang wanita yang melihat keluar darah dari farjinya sebelum sempurnanya usia
//                       9 tahun dengan selisih masa yang tidak cukup untuk masa minimal suci (masa minimal suci adalah 15
//                       hari) dan minimal Haid (24 jam = 1 hari) jadi jumlah 16 hari.
//                     </p>

//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div className="bg-green-50 p-4 rounded-lg">
//                         <h4 className="font-semibold text-green-800 mb-2">✓ Dihukumi Haid:</h4>
//                         <p className="text-sm text-green-700">
//                           Jika usia 9 tahun kurang 16 hari atau lebih sedikit (kurang 15 hari, kurang 14 hari, kurang 13
//                           hari, dst.)
//                         </p>
//                       </div>

//                       <div className="bg-red-50 p-4 rounded-lg">
//                         <h4 className="font-semibold text-red-800 mb-2">✗ Bukan Haid:</h4>
//                         <p className="text-sm text-red-700">
//                           Jika usia 9 tahun kurang 17 hari atau lebih banyak (kurang 18 hari, kurang 19 hari, kurang 20
//                           hari, dst.)
//                         </p>
//                       </div>
//                     </div>

//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <p className="text-sm text-blue-800">
//                         <strong>Catatan:</strong> Dapat dipastikan kalau 9 tahun Masehi pasti sudah 9 tahun Hijriyah,
//                         karena jumlah hari dalam satu tahun pada kalender Masehi total ada 365-366 hari, sedangkan
//                         jumlah hari dalam satu tahun Hijriyah ada 354-355 hari, selisih 11 hari kurang lebih.
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Masa Haid */}
//               <Card id="masa-haid">
//                 <CardHeader>
//                   <div className="flex items-center gap-2">
//                     <Clock className="h-5 w-5 text-orange-500" />
//                     <CardTitle className="text-xl">Zaman Haid (Masa)</CardTitle>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid md:grid-cols-3 gap-4 mb-6">
//                     <div className="text-center p-4 bg-red-50 rounded-lg">
//                       <h4 className="font-semibold text-red-800">Minimal</h4>
//                       <p className="text-2xl font-bold text-red-600">24 jam</p>
//                       <p className="text-xs text-red-600">Terus-menerus atau terputus-putus dalam masa 15 hari</p>
//                     </div>

//                     <div className="text-center p-4 bg-blue-50 rounded-lg">
//                       <h4 className="font-semibold text-blue-800">Umumnya</h4>
//                       <p className="text-2xl font-bold text-blue-600">6-7 hari</p>
//                       <p className="text-xs text-blue-600">Masa galibnya</p>
//                     </div>

//                     <div className="text-center p-4 bg-purple-50 rounded-lg">
//                       <h4 className="font-semibold text-purple-800">Maksimal</h4>
//                       <p className="text-2xl font-bold text-purple-600">15 hari</p>
//                       <p className="text-xs text-purple-600">15 malam</p>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="font-semibold mb-2">Yang dimaksud Terus menerus:</h4>
//                       <p className="text-sm text-gray-700">
//                         Seandainya kapas atau sejenisnya dimasukkan ke dalam farji masih menampakan bercak atau basahnya
//                         darah haid meskipun hanya berwarna keruh dan tidak sampai mengalir kebagian luar vagina.
//                       </p>
//                     </div>

//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="font-semibold mb-2">Maksud Putus-putus dalam masa 15 hari:</h4>
//                       <p className="text-sm text-gray-700">
//                         Misal hari pertama yang keluar darah haid adalah 5 jam. Hari kedua 6 jam, hari ke empat 5 jam,
//                         terus sampai hari ke 15. Dan jika ditotal jumlah darah yang keluar ada 24 jam atau lebih.
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Sifat Darah Haid */}
//               <Card id="sifat-darah">
//                 <CardHeader>
//                   <CardTitle className="text-xl">Sifat Darah Haid</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid md:grid-cols-2 gap-6 mb-6">
//                     <div>
//                       <h4 className="font-semibold mb-3">Dari segi kekentalan:</h4>
//                       <ul className="space-y-2">
//                         <li className="flex items-center gap-2">
//                           <div className="w-3 h-3 bg-red-600 rounded-full"></div>
//                           <span>Kental</span>
//                         </li>
//                         <li className="flex items-center gap-2">
//                           <div className="w-3 h-3 bg-red-300 rounded-full"></div>
//                           <span>Encer</span>
//                         </li>
//                       </ul>
//                     </div>

//                     <div>
//                       <h4 className="font-semibold mb-3">Dari segi Bau:</h4>
//                       <ul className="space-y-2">
//                         <li className="flex items-center gap-2">
//                           <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
//                           <span>Anyir</span>
//                         </li>
//                         <li className="flex items-center gap-2">
//                           <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
//                           <span>Tidak Berbau</span>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
//                     <h4 className="font-semibold text-yellow-800 mb-3">Ihtilaf terkait flek kuning/keruh:</h4>

//                     <div className="space-y-4">
//                       <div className="bg-white p-3 rounded">
//                         <h5 className="font-semibold text-green-800">
//                           Pendapat Qaul pertama (Mu'tamad dalam madzhab Syafi'i):
//                         </h5>
//                         <p className="text-sm text-gray-700 mb-2">Flek kuning/keruh itu masih termasuk Haid.</p>
//                         <div className="bg-green-50 p-2 rounded text-xs">
//                           <p className="font-arabic text-center mb-1">لَا تَعْجَلْنَ حَتَّى تَرَيْنَ القَصَّةَ البَيْضَاء</p>
//                           <p className="italic">
//                             Artinya: "Jangan terburu-buru (menganggap suci) hingga kalian melihat cairan putih." HR.
//                             Imam Bukhori
//                           </p>
//                         </div>
//                       </div>

//                       <div className="bg-white p-3 rounded">
//                         <h5 className="font-semibold text-red-800">Pendapat Qaul kedua (sebagian Syafi'iyah):</h5>
//                         <p className="text-sm text-gray-700 mb-2">Flek kuning/keruh itu bukan haid.</p>
//                         <div className="bg-red-50 p-2 rounded text-xs">
//                           <p className="font-arabic text-center mb-1">كُنَّا لَا تَعُدُّ الكُدْرَةَ وَالصَّفْرَةَ بَعْدَ الظُّهْرِ شَيْئًا</p>
//                           <p className="italic">
//                             Artinya: "Kami dahulu tidak menganggap cairan kuning dan keruh sebagai apapun setelah
//                             bersuci (dari haid)." HR. Imam Bukhori
//                           </p>
//                         </div>
//                       </div>

//                       <div className="bg-white p-3 rounded">
//                         <h5 className="font-semibold text-blue-800">Pendapat Qaul ketiga (Tafsil/diperinci):</h5>
//                         <ul className="text-sm text-gray-700 space-y-1">
//                           <li>
//                             • Bila keluar dimasa Haid (bersambung dengan haid) ={" "}
//                             <span className="text-green-600 font-semibold">Haid</span>
//                           </li>
//                           <li>
//                             • Bila keluar setelah suci (selain masa haid) ={" "}
//                             <span className="text-red-600 font-semibold">Bukan Haid</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Haid Terputus-putus */}
//               <Card id="haid-terputus">
//                 <CardHeader>
//                   <CardTitle className="text-xl">Darah Haid yang Terputus-putus</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-6">
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <h4 className="font-semibold text-blue-800 mb-3">Contoh Kasus:</h4>
//                       <div className="grid grid-cols-3 gap-4 text-sm">
//                         <div className="bg-red-100 p-2 rounded text-center">
//                           <div className="font-semibold text-red-800">Hari 1-4</div>
//                           <div className="text-red-600">Keluar darah</div>
//                           <div className="text-xs text-red-500">Dihukumi Haid</div>
//                         </div>
//                         <div className="bg-green-100 p-2 rounded text-center">
//                           <div className="font-semibold text-green-800">Hari 5-7</div>
//                           <div className="text-green-600">Darah terhenti</div>
//                           <div className="text-xs text-green-500">Wajib mandi & solat</div>
//                         </div>
//                         <div className="bg-red-100 p-2 rounded text-center">
//                           <div className="font-semibold text-red-800">Hari 8-10</div>
//                           <div className="text-red-600">Darah kembali</div>
//                           <div className="text-xs text-red-500">Dihukumi Haid</div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
//                       <h4 className="font-semibold text-yellow-800 mb-2">Status hukum jeda suci (hari 5-7):</h4>
//                       <p className="text-sm text-gray-700 mb-3">
//                         Ulama Syafi'iyah berselisih pendapat tentang hukum jeda suci ini dan pendapat yang mu'tamad
//                         ialah dihukumi Haid. Sehingga konsekuensinya: Solat dan puasa yang ia kerjakan tidak sah, namun
//                         ia tidak berdosa.
//                       </p>

//                       <div className="bg-white p-3 rounded">
//                         <h5 className="font-semibold mb-2">Jeda suci dihukumi Haid dengan dua syarat:</h5>
//                         <ol className="text-sm space-y-1 list-decimal list-inside">
//                           <li>Total waktu keluar darah (KD) dan terhentinya darah (suci) tidak lebih 15 hari</li>
//                           <li>Total durasi keluar darah lebih dari 24 jam</li>
//                         </ol>
//                       </div>
//                     </div>

//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="font-semibold mb-2">Wanita yang terbiasa mengalami haid terputus-putus:</h4>
//                       <p className="text-sm text-gray-700 mb-3">
//                         Apakah ia boleh mengacu pada pengalaman pada siklus haid dibulan sebelumnya dan tidak boleh
//                         solat di masa terputusnya darah?
//                       </p>

//                       <div className="grid md:grid-cols-2 gap-4">
//                         <div className="bg-blue-100 p-3 rounded">
//                           <h5 className="font-semibold text-blue-800">Pendapat Imam Nawawi (Qaul Mu'tamad):</h5>
//                           <p className="text-xs text-blue-700">
//                             Tidak boleh mengacu pada kebiasaan sebelumnya, sehingga ia wajib mandi dan solat saat darah
//                             terhenti.
//                           </p>
//                         </div>

//                         <div className="bg-green-100 p-3 rounded">
//                           <h5 className="font-semibold text-green-800">Pendapat Imam Arrofi'i:</h5>
//                           <p className="text-xs text-green-700">
//                             Boleh mengacu pada kebiasaan sebelumnya sehingga ia boleh menunggu tidak solat dulu.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Hal yang Diharamkan */}
//               <Card id="larangan">
//                 <CardHeader>
//                   <div className="flex items-center gap-2">
//                     <AlertTriangle className="h-5 w-5 text-red-500" />
//                     <CardTitle className="text-xl">Hal-hal yang Diharamkan Ketika Haid dan Nifas</CardTitle>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {[
//                       "Solat",
//                       "Towaf",
//                       "Menyentuh Mushaf Al-Qur'an",
//                       "Membawa Al-Qur'an",
//                       "I'tikaf di masjid",
//                       "Membaca Al-Qur'an",
//                       "Puasa",
//                       "Talaq",
//                       "Masuk ke dalam mesjid (ngaliwat) apabila darah Haid & nifas dikhawatirkan akan mengotori masjid",
//                       "Kenikmatan dengan apa-apa yang ada diantara pusar & lutut",
//                       "Bersetubuh (Jima)",
//                     ].map((item, index) => (
//                       <div key={index} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
//                         <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
//                           {index + 1}
//                         </div>
//                         <span className="text-sm text-red-800">{item}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Macam-macam Istihadah */}
//               <Card id="istihadah">
//                 <CardHeader>
//                   <CardTitle className="text-xl">Macam-macam Istihadah</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-6">
//                     {/* Istihadah Terus Menerus */}
//                     <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
//                       <h4 className="font-semibold text-red-800 mb-3">1. Terus Menerus</h4>
//                       <p className="text-sm text-gray-700 mb-3">
//                         Jika darah keluar terus menerus lebih dari 15 hari 15 malam
//                       </p>

//                       <div className="bg-white p-3 rounded">
//                         <h5 className="font-semibold mb-2">Contoh:</h5>
//                         <ul className="text-sm space-y-1">
//                           <li>• Haid sebelumnya: 8 hari</li>
//                           <li>• KD (Keluar Darah): 17 hari</li>
//                         </ul>

//                         <div className="mt-3 p-2 bg-yellow-50 rounded text-xs">
//                           <p>
//                             <strong>Penyelesaian:</strong>
//                           </p>
//                           <p>• Yang dihukumi haid: 8 hari (sesuai haid sebelumnya)</p>
//                           <p>• 9 hari sisanya: darah istihadah</p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Istihadah Terputus-putus */}
//                     <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
//                       <h4 className="font-semibold text-blue-800 mb-3">2. Terputus-Putus</h4>
//                       <p className="text-sm text-gray-700 mb-3">
//                         Jika darah keluar lebih dari 15 hari, namun diselingi dengan jeda suci.
//                       </p>

//                       <div className="bg-white p-3 rounded">
//                         <h5 className="font-semibold mb-2">Contoh:</h5>
//                         <ul className="text-sm space-y-1">
//                           <li>• Haid sebelumnya: 8 hari</li>
//                           <li>• KD: 10 hari</li>
//                           <li>• B (Bersih): 3 hari</li>
//                           <li>• KD: 4 hari</li>
//                         </ul>

//                         <div className="mt-3 p-2 bg-yellow-50 rounded text-xs">
//                           <p>
//                             <strong>Penyelesaian:</strong>
//                           </p>
//                           <p>• Yang dihukumi haid: 8 hari</p>
//                           <p>• Hari ke-9: istihadah</p>
//                           <p>• Masa bersih 3 hari: suci</p>
//                           <p>• 4 hari setelahnya: istihadah</p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Penyempurnaan Suci */}
//                     <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
//                       <h4 className="font-semibold text-green-800 mb-3">3. Penyempurnaan Suci</h4>
//                       <p className="text-sm text-gray-700 mb-3">
//                         Jika masa suci antara kedua siklus haid tidak mencapai minimal suci (15 hari)
//                       </p>

//                       <div className="bg-white p-3 rounded">
//                         <h5 className="font-semibold mb-2">Contoh:</h5>
//                         <ul className="text-sm space-y-1">
//                           <li>• KD 1: 6 hari</li>
//                           <li>• B (Bersih): 12 hari</li>
//                           <li>• KD 2: 8 hari</li>
//                         </ul>

//                         <div className="mt-3 p-2 bg-yellow-50 rounded text-xs">
//                           <p>
//                             <strong>Penyelesaian:</strong>
//                           </p>
//                           <p>• Darah pertama 6 hari: dihukumi Haid</p>
//                           <p>• Masa suci hanya 12 hari, perlu ditambah 3 hari</p>
//                           <p>• 3 hari pertama KD 2: dihukumi istihadah (untuk menyempurnakan suci)</p>
//                           <p>• 5 hari sisanya: dihukumi haid</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-6 bg-gray-50 p-4 rounded-lg">
//                     <p className="text-sm text-gray-700">
//                       <strong>Catatan Penting:</strong> Wanita yang sedang istihadah tetap diwajibkan solat, puasa,
//                       bersetubuh, dan lainnya. Darah istihadah tidak menjadi penyebab wajibnya mandi besar, tidak pula
//                       menjadi penyebab dilarangnya ibadah. Istihadah hanyalah sebatas darah kotor yang keluar dari rahim
//                       wanita.
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Tata Cara Solat Wanita Istihadah */}
//               <Card id="solat-istihadah">
//                 <CardHeader>
//                   <CardTitle className="text-xl">Tata Cara Solat Wanita Istihadah</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {[
//                       {
//                         no: 1,
//                         title: "Membasuh kemaluan sebelum mengerjakan solat",
//                         desc: "",
//                       },
//                       {
//                         no: 2,
//                         title: "Menyumbat atau menutup kemaluan",
//                         desc: "Dengan kapas atau sesamanya ketika hendak solat. Dengan tiga syarat: tidak menimbulkan rasa sakit yang sangat parah, tidak dalam keadaan puasa (fardhu), penyumbatan dilakukan jika dibutuhkan saja.",
//                       },
//                       {
//                         no: 3,
//                         title: "Membalut kemaluannya",
//                         desc: "Dilakukan setelah menyumbat dan menutupnya",
//                       },
//                       {
//                         no: 4,
//                         title: "Wudhu setelah masuknya waktu solat",
//                         desc: "Tidak boleh wudhu sebelum masuknya waktu solat, karena wudhu saat istihadah termasuk bersuci yang darurat",
//                       },
//                       {
//                         no: 5,
//                         title: "Harus cepat-cepat tanpa jeda panjang",
//                         desc: "Antara kewajiban pertama hingga kelima harus dilakukan berurutan tanpa jeda waktu yang panjang",
//                       },
//                       {
//                         no: 6,
//                         title: "Wudhu dalam setiap solat wajib",
//                         desc: "Tidak bisa menggunakan satu wudhu untuk dua solat wajib",
//                       },
//                       {
//                         no: 7,
//                         title: "Tidak mengakhirkan solat",
//                         desc: "Harus segera solat setelah waktu masuk, kecuali ada kemaslahatan yang berkaitan dengan solat itu sendiri",
//                       },
//                     ].map((item) => (
//                       <div key={item.no} className="flex gap-4 p-4 bg-blue-50 rounded-lg">
//                         <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
//                           {item.no}
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-blue-800 mb-1">{item.title}</h4>
//                           {item.desc && <p className="text-sm text-blue-700">{item.desc}</p>}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Tata Cara Mandi Wajib */}
//               <Card id="mandi-wajib">
//                 <CardHeader>
//                   <CardTitle className="text-xl">Tata Cara Mandi Wajib yang Baik dan Benar</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-6">
//                     {/* Niat */}
//                     <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
//                       <h4 className="font-semibold text-green-800 mb-3">1. Niat</h4>

//                       <div className="space-y-4">
//                         <div className="bg-white p-3 rounded">
//                           <h5 className="font-semibold mb-2">Niat secara umum:</h5>
//                           <div className="text-center mb-2">
//                             <p className="text-lg font-arabic text-green-800">
//                               نَوَيْتُ الْغُسْلَ لِرَفَعِ الْحَدَثِ الْأَكْبَرِ فَرْضًا لِلَّهِ تَعَالَى
//                             </p>
//                           </div>
//                           <p className="text-sm italic">
//                             "Nawaitul gusla lirof'il hadasi akbari fardhon lillahi ta'ala"
//                           </p>
//                           <p className="text-xs text-gray-600">
//                             Artinya: Aku berniat mandi besar untuk menghilangkan hadas besar fardhu karena Allah Ta'ala.
//                           </p>
//                         </div>

//                         <div className="bg-white p-3 rounded">
//                           <h5 className="font-semibold mb-2">Niat Setelah Haid:</h5>
//                           <div className="text-center mb-2">
//                             <p className="text-lg font-arabic text-green-800">
//                               نَوَيْتُ الْغُسْلَ لِرَفَعِ الْحَدَث الأكبر عن الْحَيْضِ فَرضًا لِلَّهِ تعالى
//                             </p>
//                           </div>
//                           <p className="text-sm italic">
//                             "Nawaitul gusla lirof'il hadasi akbari 'anil haidi fardhon lillahi ta'ala"
//                           </p>
//                           <p className="text-xs text-gray-600">
//                             Artinya: Aku berniat mandi besar untuk menghilangkan hadas besar dari haid fardhu karena
//                             Allah Ta'ala.
//                           </p>
//                         </div>

//                         <div className="bg-white p-3 rounded">
//                           <h5 className="font-semibold mb-2">Niat Setelah Nifas:</h5>
//                           <div className="text-center mb-2">
//                             <p className="text-lg font-arabic text-green-800">
//                               نَوَيْتُ الْغُسْلِ لِرَفَعِ الْحَدَث الأكبر عن النَّفَاسِ فَرضًا لِلَّهِ تعالى
//                             </p>
//                           </div>
//                           <p className="text-sm italic">
//                             "Nawaitul gusla lirof'il hadasi akbari 'anil nifasi fardhon lillahi ta'ala"
//                           </p>
//                           <p className="text-xs text-gray-600">
//                             Artinya: Aku berniat mandi besar untuk menghilangkan hadas besar dari nifas fardhu karena
//                             Allah Ta'ala.
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Langkah-langkah */}
//                     <div className="space-y-4">
//                       {[
//                         {
//                           no: 2,
//                           title: "Mencuci Kedua Tangan",
//                           desc: "Cuci tangan sampai 3 kali, hal ini bertujuan agar tangan bersih dari najis",
//                         },
//                         {
//                           no: 3,
//                           title: "Membersihkan Bagian Tubuh Yang Dianggap Kotor",
//                           desc: "Bagian yang dianggap kotor adalah kemaluan dan bagian disekitarnya",
//                         },
//                         {
//                           no: 4,
//                           title: "Mencuci Kembali Tangan",
//                           desc: "Setelah membersihkan bagian yang kotor, dapat dilakukan dengan membersihkan tangan menggunakan sabun",
//                         },
//                         {
//                           no: 5,
//                           title: "Berwudhu",
//                           desc: "Lakukan tata cara seperti wudhu biasa yang dilakukan sebelum melakukan solat",
//                         },
//                         {
//                           no: 6,
//                           title: "Membasahi Kepala",
//                           desc: "Basahi atau siram kepala dengan air sebanyak 3x hingga ke pangkal rambut",
//                         },
//                         {
//                           no: 7,
//                           title: "Memisah-misah Rambut",
//                           desc: "Memisah-misah rambut dengan cara menyela-nyela rambut menggunakan jari tangan. Hukumnya wajib untuk laki-laki dan sunat (mandub) bagi wanita",
//                         },
//                         {
//                           no: 8,
//                           title: "Membasahi Seluruh Tubuh",
//                           desc: "Mengguyur air keseluruh badan dimulai dari sisi kanan dan dilanjutkan dengan sisi kiri",
//                         },
//                       ].map((item) => (
//                         <div key={item.no} className="flex gap-4 p-4 bg-blue-50 rounded-lg">
//                           <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
//                             {item.no}
//                           </div>
//                           <div>
//                             <h4 className="font-semibold text-blue-800 mb-1">{item.title}</h4>
//                             <p className="text-sm text-blue-700">{item.desc}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="bg-green-50 p-4 rounded-lg text-center">
//                       <p className="text-green-800 font-semibold">
//                         DEMIKIAN TATA CARA UNTUK MANDI WAJIB YANG DAPAT DILAKUKAN. DENGAN MELAKUKANNYA DENGAN BENAR,
//                         MAKA AKAN MEMBERSIHKAN DIRI DARI HADAS BESAR. IBADAH YANG DILAKUKAN JUGA DAPAT DITERIMA OLEH
//                         ALLAH SWT.
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <footer className="bg-gray-800 text-white py-8 mt-12">
//           <div className="container mx-auto px-4 text-center">
//             <p className="text-gray-300">
//               Artikel ini disusun berdasarkan kajian fiqh dalam madzhab Syafi'i. Untuk pemahaman yang lebih mendalam,
//               disarankan untuk berkonsultasi dengan ulama yang kompeten.
//             </p>
//             <p className="text-gray-400 text-sm mt-2">Semoga bermanfaat dan menjadi amal jariyah bagi penyusunnya.</p>
//           </div>
//         </footer>
//       </div>
//     </PrivateRoute>
//   )
// }
