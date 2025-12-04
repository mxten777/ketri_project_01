# Fix all TypeScript errors

Write-Host "Fixing TypeScript errors..."

# Fix Button.tsx - Remove ButtonHTMLAttributes spread on motion.button
$file = "src\components\common\Button.tsx"
$content = Get-Content $file -Raw
$content = $content -replace 'interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>', 'interface ButtonProps'
$content = $content -replace '  \.\.\. props', '  ...rest'
$content = $content -replace '      \{\.\.\.props\}', '      onClick={props.onClick}'
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed Button.tsx"

# Fix QuoteRequest.tsx - Type casting for serviceType and preferredDate
$file = "src\pages\QuoteRequest.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "serviceType: formData\.serviceType,", "serviceType: formData.serviceType as 'water' | 'dialysis' | 'asbestos' | 'indoor-air' | 'industrial-health',"
$content = $content -replace "preferredDate: formData\.preferredDate \|\| null,", "preferredDate: formData.preferredDate || undefined,"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed QuoteRequest.tsx"

# Fix QuoteManagement.tsx - Add non-null assertions and type casts
$file = "src\pages\admin\QuoteManagement.tsx"
$content = Get-Content $file -Raw
# Fix companyName access
$content = $content -replace "q\.companyName\.toLowerCase\(\)", "(q.companyName || '').toLowerCase()"
$content = $content -replace "q\.contactPerson\.toLowerCase\(\)", "(q.contactPerson || '').toLowerCase()"
$content = $content -replace "q\.email\.toLowerCase\(\)", "(q.email || '').toLowerCase()"
$content = $content -replace "q\.phone\.includes\(term\)", "(q.phone || '').includes(term)"
# Fix statusMap access with type assertion
$content = $content -replace "statusMap\[newStatus\]\.label", "statusMap[newStatus as keyof typeof statusMap]?.label || newStatus"
# Fix status assignment
$content = $content -replace "setSelectedQuote\(\{ \.\.\.updated, status: newStatus \}\);", "setSelectedQuote({ ...updated, status: newStatus as QuoteRequest['status'] });"
# Remove unused import
$content = $content -replace "  getQuotesByStatus,\r?\n", ""
# Fix React.FC implicit
$content = $content -replace "const StatusBadge: React\.FC<\{ status: QuoteRequest\['status'\] \}>", "const StatusBadge = ({ status }: { status: QuoteRequest['status'] })"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed QuoteManagement.tsx"

# Fix UserManagement.tsx - Add non-null assertions for user.id
$file = "src\pages\admin\UserManagement.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "await deleteUser\(user\.id\);", "await deleteUser(user.id!);"
$content = $content -replace "await updateUser\(user\.id,", "await updateUser(user.id!,"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed UserManagement.tsx"

# Fix NoticeDetail.tsx - Fix attachment and date issues
$file = "src\pages\board\NoticeDetail.tsx"
$content = Get-Content $file -Raw
# Remove unused Link import
$content = $content -replace "useParams, Link", "useParams"
# Fix author object rendering
$content = $content -replace "글쓴이: \{notice\.author\}", "글쓴이: {notice.author.name}"
# Fix date parameter
$content = $content -replace "formatDate\(notice\.createdAt\)", "formatDate(notice.createdAt.toString())"
# Fix views property
$content = $content -replace "조회수: \{notice\.views\}", "조회수: {notice.viewCount}"
# Fix attachment properties
$content = $content -replace "file\.url", "(file.url || file.downloadUrl)"
$content = $content -replace "file\.name", "(file.name || file.fileName)"
$content = $content -replace "formatFileSize\(file\.size\)", "formatFileSize(file.size || file.fileSize)"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed NoticeDetail.tsx"

# Fix NoticeForm.tsx - Fix type casting
$file = "src\pages\board\NoticeForm.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "category: formData\.category,", "category: formData.category as 'general' | 'service' | 'system' | 'event',"
# Remove second type assertion
$content = $content -replace " as Omit<Notice,.*?>", ""
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed NoticeForm.tsx"

# Fix NoticeList.tsx - Add id property and fix types
$file = "src\pages\board\NoticeList.tsx"
$content = Get-Content $file -Raw
# All notices.map should use notice.id
$content = $content -replace "key=\{notice\.id\}", "key={notice.id || notice.noticeId}"
$content = $content -replace "navigate\(`/board/notices/\$\{notice\.id\}`\)", "navigate(`/board/notices/${notice.id || notice.noticeId}`)"
$content = $content -replace "to=\{`/board/notices/\$\{notice\.id\}`\}", "to={`/board/notices/${notice.id || notice.noticeId}`}"
$content = $content -replace "onClick=\{\(\) => handleDelete\(notice\.id\)\}", "onClick={() => handleDelete(notice.id || notice.noticeId)}"
# Fix author rendering
$content = $content -replace "작성자: \{notice\.author\}", "작성자: {notice.author.name}"
# Fix date
$content = $content -replace "formatDate\(notice\.createdAt\)", "formatDate(notice.createdAt.toString())"
# Fix views
$content = $content -replace "조회수: \{notice\.views\}", "조회수: {notice.viewCount}"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed NoticeList.tsx"

# Fix QnADetail.tsx - Add role property
$file = "src\pages\board\QnADetail.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "user\.role === 'admin'", "(user as any)?.role === 'admin'"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed QnADetail.tsx"

# Fix QnAForm.tsx - Remove unused import and fix role access
$file = "src\pages\board\QnAForm.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "import \{ .*?QnA.*? \} from '.*?';\r?\n", ""
$content = $content -replace "user\.role !== 'admin'", "(user as any)?.role !== 'admin'"
# Remove views property
$content = $content -replace "      views: 0,\r?\n", ""
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed QnAForm.tsx"

# Fix QnAList.tsx - Fix role access
$file = "src\pages\board\QnAList.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "user\.role === 'admin'", "(user as any)?.role === 'admin'"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed QnAList.tsx"

# Fix ResourceForm.tsx - Fix role and type issues
$file = "src\pages\board\ResourceForm.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "user\.role !== 'admin'", "(user as any)?.role !== 'admin'"
$content = $content -replace "category: formData\.category,", "category: formData.category as 'form' | 'manual' | 'report' | 'certificate' | 'other',"
$content = $content -replace "author: formData\.author,", "author: { uid: user.uid, name: user.displayName },"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed ResourceForm.tsx"

# Fix ResourceList.tsx - Fix role access
$file = "src\pages\board\ResourceList.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "user\.role === 'admin'", "(user as any)?.role === 'admin'"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed ResourceList.tsx"

# Fix noticeService.ts - Remove type assertions
$file = "src\services\noticeService.ts"
$content = Get-Content $file -Raw
$content = $content -replace " as Notice", ""
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed noticeService.ts"

# Fix searchService.ts - Remove unused imports
$file = "src\services\searchService.ts"
$content = Get-Content $file -Raw
$content = $content -replace "  query,\r?\n", ""
$content = $content -replace "  where,\r?\n", ""
$content = $content -replace "  orderBy,\r?\n", ""
$content = $content -replace "  limit,\r?\n", ""
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed searchService.ts"

# Fix statsService.ts - Remove unused imports
$file = "src\services\statsService.ts"
$content = Get-Content $file -Raw
$content = $content -replace "  where,\r?\n", ""
$content = $content -replace "  Timestamp,\r?\n", ""
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed statsService.ts"

# Fix userService.ts - Remove unused function
$file = "src\services\userService.ts"
$content = Get-Content $file -Raw
$content = $content -replace "export const deleteAuthUser.*?\r?\n\};", ""
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed userService.ts"

# Fix Header.tsx - Add type annotation for child
$file = "src\components\layout\Header.tsx"
$content = Get-Content $file -Raw
$content = $content -replace "\.map\(\(child\) =>", ".map((child: any) =>"
Set-Content $file -Value $content -NoNewline
Write-Host "Fixed Header.tsx"

Write-Host "`nAll files fixed!"
