Lab Hardening Practice

Laboratorium praktik keamanan sistem untuk pembelajaran hardening server Debian/Ubuntu. Lab ini menyediakan lingkungan dengan konfigurasi layanan yang **sengaja dibuat rentan** untuk dilatih oleh peserta.

Deskripsi
Lab ini dirancang untuk melatih keterampilan hardening sistem dan layanan jaringan. Peserta akan belajar mengidentifikasi kerentanan dan menerapkan best practices keamanan pada layanan-layanan standar server.
Tujuan Pembelajaran
- Mengidentifikasi konfigurasi layanan yang tidak aman
- Menerapkan hardening pada layanan FTP, SSH, dan Samba
- Memahami prinsip least privilege
- Menerapkan security best practices pada Linux server

Layanan yang Tersedia
| Layanan   | Port  | Status  |
| Apache Web Server | 80 | Aktif    |
| vsftpd (FTP)   | 21  | Rentan |
| OpenSSH   | 22  | Rentan |
| Samba   | 445  | Rentan |

Prerequisites
- Sistem operasi Debian-based
- Akses root atau sudo
- Koneksi internet (untuk download package)

Instalasi Otomatis
1. Clone repository ini:
git clone https://github.com/wbudi75/lab-hardening-nusantara.git
cd lab-hardening-nusantara

2. Jalankan script instalasi:
chmod +x install.sh
sudo ./install.sh

3. Catat informasi server yang ditampilkan:
IP Server: xxx.xxx.xxx.xxx
User Admin: singkong | Password: goreng (sudo access)

Instalasi Manual (Opsional)
Jika script otomatis gagal, instal manual:
sudo apt update
sudo apt install -y apache2 php libapache2-mod-php vsftpd openssh-server samba sudo


*User Account*
| Username  | Password | Hak Akses   |
| singkong  | goreng   | sudo (root) |


*Struktur File*
lab-hardening-nusantara/
├── README.md              # Dokumentasi ini
├── install.sh                      # Script instalasi otomatis
├── aseli.html                     # File HTML (akan dipindah ke /opt/)
├── conf/                            # Konfigurasi layanan rentan
│   ├── smb.conf                # Konfigurasi Samba
│   ├── sshd_config           # Konfigurasi SSH
│   └── vsftpd.conf             # Konfigurasi FTP
└── web/                            # File website
    ├── images/                   # Asset gambar
    ├── index.html               # Homepage
    ├── script.js                   # JavaScript
    └── style.css                 # Styling








Tugas Hardening
1. **FTP Server (vsftpd)**
**Kerentanan:**
- Anonymous FTP login enabled
- Tidak ada enkripsi
- Permission terlalu longgar
**Tugas:**
- [ ] Disable anonymous login
- [ ] Enable FTPS (FTP over SSL/TLS)
- [ ] Batasi user pada home directory (chroot)
- [ ] Atur permission yang tepat

2. **SSH Server**
**Kerentanan:**
- Root login diperbolehkan
- Password authentication tanpa batasan
- Port default 22
- Tidak ada fail2ban
**Tugas:**
- [ ] Disable root login
- [ ] Ganti port default
- [ ] Setup SSH key authentication
- [ ] Install dan konfigurasi fail2ban
- [ ] Batasi user yang boleh akses SSH
- [ ] Disable password authentication (opsional)

3. **Samba Server**
**Kerentanan:**
- Guest access enabled
- Share writable tanpa autentikasi
- Permission 777
**Tugas:**
- [ ] Disable guest access
- [ ] Setup autentikasi user
- [ ] Batasi write access
- [ ] Atur permission yang sesuai
- [ ] Enable SMB encryption

4. **Web Server (Apache)**
**Tugas:**
- [ ] Disable directory listing
- [ ] Hide server signature
- [ ] Setup HTTPS/SSL
- [ ] Configure security headers
⚠️ **PERINGATAN**: 
- Script ini sengaja membuat konfigurasi **TIDAK AMAN** untuk tujuan pembelajaran
- **JANGAN** gunakan konfigurasi default dari script ini di production
- Selalu test di lingkungan terisolasi (VM/Lab)
- Setelah latihan, pastikan untuk hardening semua layanan

