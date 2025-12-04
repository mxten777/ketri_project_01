$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$PSDefaultParameterValues['*:Encoding'] = 'utf8'

$fixes = Get-Content "import-fixes.json" -Raw -Encoding UTF8 | ConvertFrom-Json

foreach ($filePath in $fixes.PSObject.Properties.Name) {
    $fullPath = $filePath
    Write-Host "Processing: $fullPath"
    
    $content = Get-Content $fullPath -Raw -Encoding UTF8
    $fixes.$filePath.PSObject.Properties | ForEach-Object {
        $oldImport = $_.Name
        $newImport = $_.Value
        $content = $content -replace [regex]::Escape("from '$oldImport'"), "from '$newImport'"
        $content = $content -replace [regex]::Escape("from `"$oldImport`""), "from `"$newImport`""
    }
    
    [System.IO.File]::WriteAllText($fullPath, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Fixed: $fullPath"
}

Write-Host "`nAll imports fixed successfully!"
