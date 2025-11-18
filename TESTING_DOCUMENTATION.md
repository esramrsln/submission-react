# Dokumentasi Testing dan CI/CD

## Automation Testing

### 1. Reducer Tests

#### `test/authReducer.test.js`
- **Skenario**: Test reducer untuk authSlice
- **Test Cases**:
  1. `loginUser.fulfilled` - Memperbarui token pengguna
  2. `logout` - Mengosongkan token dan user
  3. `fetchMe.fulfilled` - Memperbarui data user

#### `test/threadsReducer.test.js`
- **Skenario**: Test reducer untuk threadsSlice
- **Test Cases**:
  1. `fetchThreads.pending` - Status berubah menjadi "loading"
  2. `fetchThreads.fulfilled` - Status menjadi "succeeded" dan items terisi
  3. `fetchThreads.rejected` - Status menjadi "failed" dan error terisi
  4. `createThread.fulfilled` - Thread baru ditambahkan ke awal array

### 2. Thunk Tests

#### `test/authThunk.test.js`
- **Skenario**: Test async thunk untuk auth
- **Test Cases**:
  1. `loginUser.fulfilled` - Menyimpan token ke localStorage
  2. `loginUser.rejected` - Mengembalikan error
  3. `fetchMe.fulfilled` - Memperbarui user state
  4. `fetchMe.rejected` - Mengosongkan user state

#### `test/threadsThunk.test.js`
- **Skenario**: Test async thunk untuk threads
- **Test Cases**:
  1. `fetchThreads.fulfilled` - Mengembalikan array threads
  2. `fetchThreads.rejected` - Mengembalikan error
  3. `fetchThreads.pending` - Set loading state
  4. `createThread.fulfilled` - Mengembalikan thread baru
  5. `createThread.rejected` - Mengembalikan error

### 3. Component Tests

#### `src/components/__tests__/CreateThreadForm.test.jsx`
- **Skenario**: Test komponen form untuk membuat thread
- **Test Cases**:
  1. Render semua input fields dan tombol submit
  2. Update input fields ketika user mengetik
  3. Tampilkan alert ketika submit dengan field kosong
  4. Tampilkan alert ketika submit tanpa token
  5. Clear form fields setelah submission berhasil

#### `src/components/__tests__/ThreadList.test.jsx`
- **Skenario**: Test komponen list threads
- **Test Cases**:
  1. Tampilkan Loading ketika status loading
  2. Tampilkan "No threads yet." ketika tidak ada threads
  3. Tampilkan list threads dengan owner information
  4. Dispatch fetchThreads dan fetchUsers ketika status idle

### 4. End-to-End Tests

#### `test/e2e/login.spec.js`
- **Skenario**: Test E2E untuk alur login menggunakan Playwright
- **Test Cases**:
  1. Menampilkan halaman login ketika navigasi ke /login
  2. Memungkinkan user mengetik di email dan password fields
  3. Login berhasil dengan kredensial valid dan redirect ke home
  4. Menampilkan error message ketika login gagal
  5. Navigasi ke login page dari home ketika tidak authenticated

## CI/CD Setup

### GitHub Actions Workflow (`.github/workflows/ci.yml`)

Workflow terdiri dari 3 jobs:

1. **test**: Menjalankan linter, unit tests, dan build
2. **e2e**: Menjalankan E2E tests dengan Cypress
3. **deploy**: Deploy ke Vercel (hanya untuk branch master/main)

### Branch Protection

Untuk memproteksi branch master:
1. Buka Settings > Branches di GitHub repository
2. Add rule untuk branch master
3. Enable "Require status checks to pass before merging"
4. Pilih status checks: "test" dan "e2e"
5. Enable "Require pull request reviews before merging" (opsional)

## React Ecosystem

### React Hook Form

Library React Hook Form telah diintegrasikan ke form Register (`src/pages/Register.jsx`) untuk:
- Form validation
- Error handling
- Better form state management

## Menjalankan Tests

```bash
# Unit dan Integration Tests
npm test

# E2E Tests (Playwright)
npm run e2e

# E2E Tests (UI mode)
npm run e2e:ui
```

## Screenshots yang Diperlukan

Untuk submission, pastikan untuk mengambil screenshot:

1. **1_ci_check_error.png**: CI check error karena pengujian gagal
2. **2_ci_check_pass.png**: CI check pass karena pengujian lolos
3. **3_branch_protection.png**: Branch protection pada halaman PR

Simpan screenshot di folder `screenshots/` di root project.

