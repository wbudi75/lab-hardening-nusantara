Lab Hardening Practice

Laboratorium praktik keamanan sistem untuk pembelajaran hardening server Debian/Ubuntu. Lab ini menyediakan lingkungan dengan konfigurasi layanan yang **sengaja dibuat rentan** untuk dilatih oleh peserta.

Deskripsi
Lab ini dirancang untuk melatih keterampilan hardening sistem dan layanan jaringan. Peserta akan belajar mengidentifikasi kerentanan dan menerapkan best practices keamanan pada layanan-layanan standar server.
Tujuan Pembelajaran
- Mengidentifikasi konfigurasi layanan yang tidak aman
- Menerapkan hardening pada layanan FTP, SSH, dan Samba
- Memahami prinsip least privilege
- Menerapkan security best practices pada Linux server

*Prerequisites*
- Sistem operasi Debian-based
- Akses root atau sudo
- Koneksi internet (untuk download package)

*Instalasi Otomatis*
1. Clone repository ini: git clone https://github.com/wbudi75/lab-hardening-nusantara.git
2. cd lab-hardening-nusantara
3. Jalankan script instalasi: chmod +x install.sh
4. sudo ./install.sh
5. Catat informasi server yang ditampilkan: IP Server: xxx.xxx.xxx.xxx
6. User Admin: singkong | Password: goreng (sudo access)

*Instalasi Manual (Opsional)*
1. Jika script otomatis gagal, instal manual:
2. sudo apt update
3. sudo apt install -y apache2 php libapache2-mod-php vsftpd openssh-server samba sudo


Username: singkong;
Password: goreng

*Tugas Hardening*
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
      
 **PERINGATAN**: 
- Script ini sengaja membuat konfigurasi **TIDAK AMAN** untuk tujuan pembelajaran
- **JANGAN** gunakan konfigurasi default dari script ini di production
- Selalu test di lingkungan terisolasi (VM/Lab)
- Setelah latihan, pastikan untuk hardening semua layanan

