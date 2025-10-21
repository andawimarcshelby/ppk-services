param(
  [string]$BaseUrl = "http://localhost:8000",
  [string]$FrontendUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$global:Failures = 0

function Header($text) {
  Write-Host ""
  Write-Host ("==[ {0} ]==" -f $text) -ForegroundColor Cyan
}

function Fail($msg) {
  $global:Failures++
  Write-Host ("❌ {0}" -f $msg) -ForegroundColor Red
}

function Pass($msg) {
  Write-Host ("✅ {0}" -f $msg) -ForegroundColor Green
}

function Info($msg) {
  Write-Host ("   {0}" -f $msg) -ForegroundColor DarkCyan
}

function Get-Json($url, $headers=@{}) {
  return Invoke-RestMethod -Uri $url -Method Get -Headers $headers -TimeoutSec 15
}

function Post-Json($url, $bodyObj, $headers=@{}) {
  $json = $bodyObj | ConvertTo-Json -Depth 6 -Compress
  return Invoke-RestMethod -Uri $url -Method Post -ContentType "application/json" -Body $json -Headers $headers -TimeoutSec 15
}

function Test-Health {
  Header "Health / CORS"
  try {
    $resp = Invoke-WebRequest -Uri ($BaseUrl.TrimEnd('/') + "/api/validate") -Headers @{ Origin = $FrontendUrl } -Method Get -TimeoutSec 15
    if ($resp.StatusCode -eq 200) {
      $allow = $resp.Headers["Access-Control-Allow-Origin"]
      if ($allow -eq $FrontendUrl) {
        Pass ("Health OK (CORS Origin: {0})" -f $allow)
      } else {
        Fail ("Health OK but CORS not matched (got: {0})" -f $allow)
      }
    } else {
      Fail ("Health returned HTTP {0}" -f $resp.StatusCode)
    }
  } catch {
    Fail ("Health error: {0}" -f $_.Exception.Message)
  }
}

function Test-Companies {
  Header "Companies list"
  try {
    $arr = Get-Json ($BaseUrl.TrimEnd('/') + "/api/companies")
    if ($arr -and $arr.Count -ge 2) {
      Pass ("Loaded {0} companies" -f $arr.Count)
      foreach ($c in $arr) {
        Info ("{0,-2}  {1,-18}  {2}" -f $c.id, $c.name, $c.code)
      }
    } else {
      Fail "Companies array empty or missing."
    }
  } catch {
    Fail ("Companies error: {0}" -f $_.Exception.Message)
  }
}

function Get-Token($username, $password, $companyCode) {
  $body = @{
    username     = $username
    password     = $password
    company_code = $companyCode
  }
  $resp = Post-Json ($BaseUrl.TrimEnd('/') + "/api/login") $body
  $tok = $resp.token
  if ([string]::IsNullOrEmpty($tok)) {
    throw "No token returned."
  }
  return $tok
}

function Test-UserFlow($user, $pass, $company) {
  Header ("Login + Modules for {0} ({1})" -f $user, $company)
  try {
    $tok = Get-Token $user $pass $company
    Pass ("Login OK. Token len: {0}" -f $tok.Length)

    $mods = Get-Json ($BaseUrl.TrimEnd('/') + "/api/modules") @{ Authorization = ("Bearer {0}" -f $tok) }
    if (-not $mods -or $mods.Count -eq 0) {
      Fail "No modules returned."
      return
    }

    Info ("Modules visible for {0}:" -f $user)
    foreach ($sys in $mods) {
      $sysName = $sys.system_name
      foreach ($m in $sys.modules) {
        $modName = $m.module_name
        $subs = @()
        foreach ($s in $m.submodules) { $subs += $s.name }
        $subsLine = ($subs -join ", ")
        Write-Host ("     - {0} → {1} [{2}]" -f $sysName, $modName, $subsLine)
      }
    }

    # Current user profile (optional)
    try {
      $me = Get-Json ($BaseUrl.TrimEnd('/') + "/api/user") @{ Authorization = ("Bearer {0}" -f $tok) }
      if ($me) { Info ("User id={0} username={1}" -f $me.id, $me.username) }
    } catch { }

  } catch {
    Fail (".flow error for {0}: {1}" -f $user, $_.Exception.Message)
  }
}

# ---- Run the suite ----
Test-Health
Test-Companies
Test-UserFlow "alice" "Passw0rd!" "PPK-FARMS"
Test-UserFlow "bob"   "Passw0rd!" "PPK-FISHERIES"

# Summary
Write-Host ""
if ($global:Failures -gt 0) {
  Write-Host ("Completed with {0} failure(s)." -f $global:Failures) -ForegroundColor Red
  exit 1
} else {
  Write-Host "All checks passed." -ForegroundColor Green
  exit 0
}
