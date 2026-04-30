#!/bin/bash
# ============================================================
# SCRIPT AUTO-DEPLOY: LAB HARDENING PRACTICE
# Author: Kukuh (Modified)
# Target: Debian-based System (LXD/VM)
# ============================================================

# Pastikan script dijalankan sebagai root
if [ "$EUID" -ne 0 ]; then
  echo "Tolong jalankan sebagai root (pake sudo ya)"
  exit 1
fi

echo "Memulai Instalasi Lab Hardening..."

# 1. Update & Install Dependencies (Sudo ditambahkan agar group 'sudo' aktif)
echo "Menginstall layanan (Apache, PHP, FTP, SSH, Samba, Sudo)"
apt update && apt install -y apache2 php libapache2-mod-php vsftpd openssh-server samba sudo

# 2. Setup Web Files
if [ -d "./web" ]; then
  echo "Menyiapkan file web di /var/www/html/"
  cp -r ./web/* /var/www/html/
  chown -R www-data:www-data /var/www/html/
  chmod -R 755 /var/www/html/
fi

# 3. Pindahkan aseli.html ke /opt/
if [ -f "./aseli.html" ]; then
  echo "Memindahkan aseli.html ke /opt/"
  mv ./aseli.html /opt/
  chmod 644 /opt/aseli.html
fi

# 4. Buat User 'singkong' dengan Hak Akses Sudo/Root
echo "Membuat user 'singkong' dengan password 'goreng'..."
useradd -m -s /bin/bash singkong
echo "singkong:goreng" | chpasswd
usermod -aG sudo singkong

# 5. Setup Layanan Sistem (Konfigurasi Rentan untuk Hardening)
echo "Menerapkan konfigurasi layanan (Intentionally Vulnerable)"

# FTP
cp ./conf/vsftpd.conf /etc/vsftpd.conf
mkdir -p /var/ftp/pub
chown -R ftp:ftp /var/ftp/pub

# SSH
cp ./conf/sshd_config /etc/ssh/sshd_config

# Samba
cp ./conf/smb.conf /etc/samba/smb.conf
mkdir -p /srv/samba/public
chmod -R 777 /srv/samba/public

# 6. Restart Semua Layanan
echo "Merestart semua layanan dengan konfigurasi rentan..."
systemctl restart apache2 vsftpd ssh smbd

echo "----------------------------------------------------"
echo "LAB BERHASIL DI-DEPLOY!"
echo "IP Server: $(hostname -I | awk '{print $1}')"
echo "User Admin: singkong | Password: goreng (sudo access)"
echo "Layanan sengaja dikonfigurasi rentan."
echo "Silakan peserta melakukan hardening sesuai best practices."
echo "Selamat berlatih!"
echo "----------------------------------------------------"