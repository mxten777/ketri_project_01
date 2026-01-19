/**
 * 브라우저 콘솔에서 실행할 수 있는 공지사항 날짜 마이그레이션 스크립트
 * 
 * 사용 방법:
 * 1. 웹사이트에 로그인한 상태로 브라우저 개발자 도구를 엽니다 (F12)
 * 2. Console 탭으로 이동합니다
 * 3. 이 스크립트를 복사해서 붙여넣고 Enter를 누릅니다
 * 4. 마이그레이션이 완료될 때까지 기다립니다
 */

(async function migrateNoticeDates() {
  console.log('🔄 공지사항 날짜 마이그레이션 시작...\n');
  
  try {
    // Firebase 임포트 (이미 페이지에 로드되어 있음)
    const { collection, getDocs, doc, updateDoc, Timestamp } = await import('firebase/firestore');
    const { db } = await import('./src/config/firebase');
    
    const noticesRef = collection(db, 'notices');
    const snapshot = await getDocs(noticesRef);
    
    if (snapshot.empty) {
      console.log('⚠️  마이그레이션할 공지사항이 없습니다.');
      return;
    }
    
    console.log(`📊 총 ${snapshot.size}개의 공지사항을 확인했습니다.\n`);
    
    let migratedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const updates = {};
      let needsUpdate = false;
      
      console.log(`\n처리 중: ${docSnap.id}`);
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
        } else if (data.createdAt.seconds !== undefined) {
          console.log(`  ✓ createdAt이 이미 Timestamp입니다.`);
        } else {
          console.log(`  ⚠️  createdAt 형식을 알 수 없습니다:`, typeof data.createdAt);
        }
      } else {
        console.log(`  ⚠️  createdAt 필드가 없습니다. 현재 시간으로 설정합니다.`);
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
        } else if (data.updatedAt.seconds !== undefined) {
          console.log(`  ✓ updatedAt이 이미 Timestamp입니다.`);
        } else {
          console.log(`  ⚠️  updatedAt 형식을 알 수 없습니다:`, typeof data.updatedAt);
        }
      } else if (updates.createdAt) {
        console.log(`  ℹ️  updatedAt을 createdAt과 동일하게 설정`);
        updates.updatedAt = updates.createdAt;
        needsUpdate = true;
      }
      
      // 업데이트 실행
      if (needsUpdate && Object.keys(updates).length > 0) {
        try {
          const docRef = doc(db, 'notices', docSnap.id);
          await updateDoc(docRef, updates);
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
    console.error('스택 트레이스:', error.stack);
  }
})();
