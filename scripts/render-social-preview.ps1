# Generador local: Windows + System.Drawing. El PNG generado se versiona.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskOutput = Join-Path $taskRoot 'public\social-preview.png'
$taskBitmap = [System.Drawing.Bitmap]::new(1200, 630)
$taskGraphics = [System.Drawing.Graphics]::FromImage($taskBitmap)
$taskGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$taskGraphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$taskBrushes = @{}
foreach ($taskColor in @('#fffaf5', '#fffdfb', '#433b48', '#76546a', '#e7c7d6', '#f5e3eb', '#efdae3', '#ba8da5')) {
  $taskBrushes[$taskColor] = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml($taskColor))
}
$taskBorder = [System.Drawing.Pen]::new([System.Drawing.ColorTranslator]::FromHtml('#e8dcd8'), 2)
$taskAccent = [System.Drawing.Pen]::new([System.Drawing.ColorTranslator]::FromHtml('#b69ba8'), 2)
$taskTitleFont = [System.Drawing.Font]::new('Georgia', 58, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$taskSubtitleFont = [System.Drawing.Font]::new('Georgia', 66, [System.Drawing.FontStyle]::Italic, [System.Drawing.GraphicsUnit]::Pixel)
$taskHeartFont = [System.Drawing.Font]::new('Segoe UI Symbol', 44, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$taskSealFont = [System.Drawing.Font]::new('Segoe UI Symbol', 27, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
try {
  $taskGraphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#fffaf5'))
  $taskGraphics.FillRectangle($taskBrushes['#fffdfb'], 56, 52, 1088, 526)
  $taskGraphics.DrawRectangle($taskBorder, 56, 52, 1088, 526)
  $taskGraphics.DrawLines($taskAccent, [System.Drawing.PointF[]]@([System.Drawing.PointF]::new(76,96), [System.Drawing.PointF]::new(76,72), [System.Drawing.PointF]::new(100,72)))
  $taskGraphics.DrawLines($taskAccent, [System.Drawing.PointF[]]@([System.Drawing.PointF]::new(1100,558), [System.Drawing.PointF]::new(1124,558), [System.Drawing.PointF]::new(1124,534)))
  $taskGraphics.DrawString('13 mensajitos', $taskTitleFont, $taskBrushes['#433b48'], 124, 200)
  $taskGraphics.DrawString('para ti', $taskSubtitleFont, $taskBrushes['#76546a'], 174, 288)
  $taskGraphics.DrawString([string][char]0x2661, $taskHeartFont, $taskBrushes['#76546a'], 386, 305)
  $taskGraphics.FillRectangle($taskBrushes['#e7c7d6'], 724, 230, 320, 206)
  $taskGraphics.FillPolygon($taskBrushes['#efdae3'], [System.Drawing.PointF[]]@([System.Drawing.PointF]::new(724,436), [System.Drawing.PointF]::new(884,323), [System.Drawing.PointF]::new(1044,436)))
  $taskGraphics.FillPolygon($taskBrushes['#f5e3eb'], [System.Drawing.PointF[]]@([System.Drawing.PointF]::new(724,230), [System.Drawing.PointF]::new(1044,230), [System.Drawing.PointF]::new(884,350)))
  $taskGraphics.FillEllipse($taskBrushes['#ba8da5'], 862, 330, 44, 44)
  $taskGraphics.DrawString([string][char]0x2661, $taskSealFont, $taskBrushes['#fffaf5'], 869, 333)
  foreach ($taskStar in @(@(708,180), @(1064,464))) {
    $taskGraphics.DrawLine($taskAccent, $taskStar[0]-7, $taskStar[1], $taskStar[0]+7, $taskStar[1])
    $taskGraphics.DrawLine($taskAccent, $taskStar[0], $taskStar[1]-7, $taskStar[0], $taskStar[1]+7)
  }
  $taskBitmap.Save($taskOutput, [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Output "Generado public/social-preview.png (1200 x 630)"
} finally {
  $taskTitleFont.Dispose(); $taskSubtitleFont.Dispose(); $taskHeartFont.Dispose(); $taskSealFont.Dispose()
  $taskBorder.Dispose(); $taskAccent.Dispose()
  foreach ($taskBrush in $taskBrushes.Values) { $taskBrush.Dispose() }
  $taskGraphics.Dispose(); $taskBitmap.Dispose()
}
