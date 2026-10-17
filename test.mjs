import fs from 'node:fs';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
    passed++;
  } else {
    console.error(`  ❌ ${message}`);
    failed++;
  }
}

console.log('\n⚡ OpenCoder — Verification Suite\n');

// 1. Upstream cleanliness
console.log('📝 Upstream cleanliness');
const filesToCheck = [
  'LICENSE.md',
  'LICENSE',
  'README.md',
  'package.json',
  'CITATION.cff',
  'MAINTAINERS.md',
  'src/lib/prompts.ts'
];

const bannedStrings = ['ducan-ne', 'ancmsvn@gmail.com'];

for (const file of filesToCheck) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    for (const banned of bannedStrings) {
      assert(!content.toLowerCase().includes(banned.toLowerCase()), `${file} has no "${banned}"`);
    }
  }
}

// 2. Required files
console.log('\n📦 Required files');
const requiredFiles = [
  'LICENSE.md',
  'LICENSE',
  'README.md',
  'CITATION.cff',
  'MAINTAINERS.md',
  'package.json',
  'tsconfig.json',
  'src/index.ts',
  'src/lib/prompts.ts'
];

for (const req of requiredFiles) {
  assert(fs.existsSync(req), `${req} exists`);
}

// 3. License check
console.log('\n🔐 License check');
const license = fs.readFileSync('LICENSE.md', 'utf8');
assert(license.includes('Abdullah Formuli'), 'LICENSE.md mentions Abdullah Formuli');

// 4. Citation check
console.log('\n📜 Citation check');
const citation = fs.readFileSync('CITATION.cff', 'utf8');
assert(citation.includes('Abdullah') && citation.includes('Formuli'), 'CITATION.cff author is Abdullah Formuli');
assert(citation.includes('authrain-cloud-abdullahformuli/opencoder'), 'CITATION.cff points to authrain-cloud-abdullahformuli/opencoder');

// 5. Maintainers check
console.log('\n👥 Maintainers check');
const maintainers = fs.readFileSync('MAINTAINERS.md', 'utf8');
assert(maintainers.includes('Abdullah Formuli') || maintainers.includes('abdullahformuli'), 'MAINTAINERS.md author is Abdullah Formuli');

// 6. Package.json check
console.log('\n📦 package.json check');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
assert(pkg.author.includes('Abdullah Formuli'), 'package.json author is Abdullah Formuli');
assert(pkg.repository.url.includes('authrain-cloud-abdullahformuli/opencoder'), 'package.json points to correct repo');

// 7. Core Prompts check
console.log('\n💬 Prompts feedback URL check');
const prompts = fs.readFileSync('src/lib/prompts.ts', 'utf8');
assert(prompts.includes('authrain-cloud-abdullahformuli/opencoder/issues'), 'src/lib/prompts.ts points to authrain-cloud-abdullahformuli issues');

console.log('\n' + '═'.repeat(50));
console.log(`  ${passed} passed, ${failed} failed`);
console.log('═'.repeat(50) + '\n');

if (failed > 0) {
  process.exit(1);
}
