# 📍 위치 좌표 관리 가이드

## 목적
한국환경안전연구소의 정확한 위치 정보를 일관되게 관리하고,  
지도 API에서 올바른 위치가 표시되도록 좌표 처리 기준을 명시합니다.

---

## 🎯 단일 Source of Truth

### 위치: `src/constants/menu.ts`

```typescript
export const CONTACT_INFO = {
  phone: "043-237-7824",
  phoneRange: "043.237.7824~5",
  fax: "043-237-7826",
  email: "kesri0728@naver.com",
  address: "충북 청주시 서원구 남이면 양촌 3길 7-30 (28805)",
  
  // 정확한 좌표 (WGS84 기준)
  coordinates: {
    latitude: 36.566807,   // 위도 (북위)
    longitude: 127.489487, // 경도 (동경)
  },
  
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!...",
};
```

**✅ 모든 지도/위치 관련 컴포넌트는 반드시 이 상수를 사용해야 합니다.**

---

## 📊 좌표 기준 정보

### 좌표계: WGS84 (GPS 표준)
- 국제 표준 좌표계
- Google Maps, Kakao Map, Naver Map 모두 WGS84 사용
- 위도(Latitude), 경도(Longitude) 형식

### 실제 위치 좌표
| 항목 | 값 | 범위 확인 |
|------|-----|----------|
| **위도 (Latitude)** | `36.566807` | ✅ 36도대 (한국 중부) |
| **경도 (Longitude)** | `127.489487` | ✅ 127도대 (한국 동경) |

### 좌표 순서 규칙
```typescript
// ✅ 올바른 순서
{ latitude: 36.566807, longitude: 127.489487 }  // (위도, 경도)

// ❌ 잘못된 순서 (뒤바뀜 주의!)
{ longitude: 127.489487, latitude: 36.566807 }  // Google Maps 등 일부 API에서 사용
```

---

## 🗺️ 지도 API별 사용법

### 1. Google Maps

#### Embed (iframe)
```typescript
// constants/menu.ts에서 가져오기
import { CONTACT_INFO } from '@/constants/menu';

<iframe 
  src={CONTACT_INFO.googleMapsEmbed}
  // ...
/>
```

#### Google Maps JavaScript API
```javascript
const position = {
  lat: CONTACT_INFO.coordinates.latitude,
  lng: CONTACT_INFO.coordinates.longitude,
};

const map = new google.maps.Map(document.getElementById("map"), {
  center: position,
  zoom: 15,
});

new google.maps.Marker({
  position: position,
  map: map,
  title: "한국환경안전연구소",
});
```

### 2. Kakao Map

```javascript
import { CONTACT_INFO } from '@/constants/menu';

const container = document.getElementById('map');
const options = {
  center: new kakao.maps.LatLng(
    CONTACT_INFO.coordinates.latitude,
    CONTACT_INFO.coordinates.longitude
  ),
  level: 3
};

const map = new kakao.maps.Map(container, options);

const markerPosition = new kakao.maps.LatLng(
  CONTACT_INFO.coordinates.latitude,
  CONTACT_INFO.coordinates.longitude
);

const marker = new kakao.maps.Marker({
  position: markerPosition
});

marker.setMap(map);
```

### 3. Naver Map

```javascript
import { CONTACT_INFO } from '@/constants/menu';

const map = new naver.maps.Map('map', {
  center: new naver.maps.LatLng(
    CONTACT_INFO.coordinates.latitude,
    CONTACT_INFO.coordinates.longitude
  ),
  zoom: 15
});

const marker = new naver.maps.Marker({
  position: new naver.maps.LatLng(
    CONTACT_INFO.coordinates.latitude,
    CONTACT_INFO.coordinates.longitude
  ),
  map: map
});
```

---

## 🔍 과거 문제 분석 및 해결

### 문제 상황
- **증상**: 지도 카드에 표시된 위치가 실제 회사 위치와 수 km 떨어짐
- **원인**: iframe의 하드코딩된 좌표가 부정확함

### Before (잘못된 코드)
```typescript
// ❌ 하드코딩된 부정확한 좌표
<iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3201.234!2d127.4894!3d36.5674!..."
/>

// 문제점:
// - 좌표 소스 불명확 (127.4894, 36.5674)
// - 실제 위치와 불일치
// - 재사용 불가
```

### After (수정된 코드)
```typescript
// ✅ 중앙화된 정확한 좌표 사용
import { CONTACT_INFO } from '@/constants/menu';

<iframe 
  src={CONTACT_INFO.googleMapsEmbed}
/>

// 개선점:
// - 정확한 좌표 (127.489487, 36.566807)
// - 단일 Source of Truth
// - 재사용 가능
```

### 좌표 비교
| 항목 | Before (잘못됨) | After (정확함) | 차이 |
|------|----------------|---------------|------|
| **경도** | 127.4894 | 127.489487 | 0.000113 (약 11m) |
| **위도** | 36.5674 | 36.566807 | 0.000593 (약 66m) |

**⚠️ 약 67m 오차 발생 → 수정 완료**

---

## ✅ 체크리스트

### 새로운 지도 컴포넌트 추가 시

- [ ] `CONTACT_INFO` 상수를 import 했는가?
- [ ] 좌표를 하드코딩하지 않았는가?
- [ ] 위도/경도 순서가 올바른가?
- [ ] 좌표계가 WGS84인가?
- [ ] 브라우저에서 실제 위치가 정확히 표시되는가?

### 좌표 검증 방법

```typescript
// 개발 중 좌표 검증
console.log('현재 좌표:', CONTACT_INFO.coordinates);
console.log('Google Maps 확인:', 
  `https://www.google.com/maps?q=${CONTACT_INFO.coordinates.latitude},${CONTACT_INFO.coordinates.longitude}`
);

// 예상 출력:
// 현재 좌표: { latitude: 36.566807, longitude: 127.489487 }
// Google Maps 확인: https://www.google.com/maps?q=36.566807,127.489487
```

---

## 🚫 금지 사항

### ❌ 하지 말아야 할 것

1. **좌표 하드코딩**
   ```typescript
   // ❌ 금지
   const lat = 36.5674;
   const lng = 127.4894;
   ```

2. **임의의 좌표 사용**
   ```typescript
   // ❌ 금지
   const position = { lat: 36.5, lng: 127.5 }; // 대략적인 값
   ```

3. **주소 → 좌표 변환 (Geocoding) 사용**
   ```typescript
   // ❌ 금지 (매번 다른 결과 가능)
   geocoder.geocode({ address: CONTACT_INFO.address }, (results) => {
     // 행정구역 중심좌표 등 부정확한 결과 가능
   });
   ```

4. **좌표 순서 혼동**
   ```typescript
   // ❌ 금지 (위도/경도 순서 뒤바뀜)
   new google.maps.LatLng(127.489487, 36.566807); // 잘못됨!
   ```

---

## 📚 참고 자료

### 좌표 확인 방법

1. **Google Maps에서 직접 확인**
   - 지도에서 해당 위치 우클릭
   - "이곳이 궁금한가요?" 클릭
   - 좌표 확인 (위도, 경도 순서)

2. **네이버 지도에서 확인**
   - 지도에서 해당 위치 클릭
   - 주소 복사 → 좌표 정보 확인

3. **온라인 좌표 변환기**
   - [https://www.latlong.net/](https://www.latlong.net/)
   - 주소 입력 → WGS84 좌표 획득

### WGS84 좌표계 범위
- **위도 (Latitude)**: -90° ~ +90°
  - 한국: 약 33° ~ 43° (남쪽 제주도 ~ 북쪽 압록강)
- **경도 (Longitude)**: -180° ~ +180°
  - 한국: 약 124° ~ 132° (서쪽 백령도 ~ 동쪽 독도)

---

## 🔄 업데이트 히스토리

### 2026-01-16
- 초기 문서 작성
- 잘못된 좌표 수정 (127.4894 → 127.489487, 36.5674 → 36.566807)
- `CONTACT_INFO`에 `coordinates` 및 `googleMapsEmbed` 추가
- Location.tsx에서 하드코딩 제거

---

**작성자**: AI Assistant  
**최종 업데이트**: 2026-01-16  
**버전**: 1.0
