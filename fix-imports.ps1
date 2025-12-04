# Fix all @ alias imports to relative paths

$files = Get-ChildItem -Path "src" -Include *.tsx,*.ts -Recurse -File

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Get the relative depth (how many ../ needed)
    $depth = ($file.FullName.Replace((Get-Location).Path + "\src\", "").Split('\').Count - 1)
    $prefix = "../" * $depth
    
    # Fix common imports
    $content = $content -replace "@components/", "${prefix}components/"
    $content = $content -replace "@pages/", "${prefix}pages/"
    $content = $content -replace "@/components/", "${prefix}components/"
    $content = $content -replace "@/pages/", "${prefix}pages/"
    $content = $content -replace "@/contexts/", "${prefix}contexts/"
    $content = $content -replace "@/services/", "${prefix}services/"
    $content = $content -replace "@/config/", "${prefix}config/"
    $content = $content -replace "@/types", "${prefix}types"
    $content = $content -replace "@types/", "${prefix}types/"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Fixed: $($file.FullName)"
    }
}

Write-Host "`nDone fixing imports!"
