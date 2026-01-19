// Firestore의 공지사항 날짜 필드를 ISO 문자열에서 Timestamp로 마이그레이션
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Firebase Admin 초기화
const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'serviceAccountKey.json'), 'utf8')
);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function migrateNoticeDates() {
  console.log('🔄 공지사항 날짜 마이그레이션 시작...\n');
  
  try {
    const noticesRef = db.collection('notices');
    const snapshot = await noticesRef.get();
    
    if (snapshot.empty) {
      console.log('⚠️  마이그레이션할 공지사항이 없습니다.');
      return;
    }
    
    console.log(`📊 총 ${snapshot.size}개의 공지사항을 확인했습니다.\n`);
    
    let migratedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const updates = {};
      let needsUpdate = false;
      
      console.log(`\n처리 중: ${doc.id}`);
      console.log(`  제목: ${data.title}`);
      
      // createdAt 체크 및 변환
      if (data.createdAt) {
        if (typeof data.createdAt === 'string') {
          console.log(`  ⚠️  createdAt이 문자열입니다: ${data.createdAt}`);
          try {
            const date = new Date(data.createdAt);
            if (!isNaN(date.getTime())) {
              updates.createdAt = Timestamp.fromDate(date);
              needsUpdate = true;
              console.log(`  ✅ createdAt을 Timestamp로 변환: ${date.toISOString()}`);
            } else {
              console.log(`  ❌ 유효하지 않은 날짜 형식`);
              errorCount++;
            }
          } catch (error) {
            console.log(`  ❌ createdAt 변환 실패: ${error.message}`);
            errorCount++;
          }
        } else if (data.createdAt._seconds !== undefined) {
          console.log(`  ✓ createdAt이 이미 Timestamp입니다.`);
        } else {
          console.log(`  ⚠️  createdAt 형식을 알 수 없습니다:`, typeof data.createdAt);
        }
      } else {
        console.log(`  ⚠️  createdAt 필드가 없습니다.`);
        // createdAt이 없으면 현재 시간으로 설정
        updates.createdAt = Timestamp.now();
        needsUpdate = true;
      }
      
      // updatedAt 체크 및 변환
      if (data.updatedAt) {
        if (typeof data.updatedAt === 'string') {
          console.log(`  ⚠️  updatedAt이 문자열입니다: ${data.updatedAt}`);
          try {
            const date = new Date(data.updatedAt);
            if (!isNaN(date.getTime())) {
              updates.updatedAt = Timestamp.fromDate(date);
              needsUpdate = true;
              console.log(`  ✅ updatedAt을 Timestamp로 변환: ${date.toISOString()}`);
            } else {
              console.log(`  ❌ 유효하지 않은 날짜 형식`);
              errorCount++;
            }
          } catch (error) {
            console.log(`  ❌ updatedAt 변환 실패: ${error.message}`);
            errorCount++;
          }
        } else if (data.updatedAt._seconds !== undefined) {
          console.log(`  ✓ updatedAt이 이미 Timestamp입니다.`);
        } else {
          console.log(`  ⚠️  updatedAt 형식을 알 수 없습니다:`, typeof data.updatedAt);
        }
      } else if (updates.createdAt) {
        // updatedAt이 없고 createdAt을 변환했다면 동일하게 설정
        updates.updatedAt = updates.createdAt;
        needsUpdate = true;
        console.log(`  ℹ️  updatedAt을 createdAt과 동일하게 설정`);
      }
      
      // 업데이트 실행
      if (needsUpdate && Object.keys(updates).length > 0) {
        try {
          await doc.ref.update(updates);
          migratedCount++;
          console.log(`  ✅ 마이그레이션 완료`);
        } catch (error) {
          console.log(`  ❌ 업데이트 실패: ${error.message}`);
          errorCount++;
        }
      } else {
        skippedCount++;
        console.log(`  ⏭️  변경 사항 없음`);
      }
    }
    
    console.log('\n\n📊 마이그레이션 결과:');
    console.log(`  ✅ 성공: ${migratedCount}개`);
    console.log(`  ⏭️  건너뜀: ${skippedCount}개`);
    console.log(`  ❌ 오류: ${errorCount}개`);
    console.log('\n✨ 마이그레이션 완료!');
    
  } catch (error) {
    console.error('\n❌ 마이그레이션 중 오류 발생:', error);
    throw error;
  }
}

// 실행
migrateNoticeDates()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
