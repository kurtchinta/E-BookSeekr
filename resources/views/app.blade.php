<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>E-BookSeekr</title> <!-- Default title -->
  @vite(['resources/css/app.css', 'resources/js/app.js'])
  <link rel="icon" type="image/png" href="{{ asset('booklogo.png') }}">
  <style>
      html{
    overflow-x: hidden;
  }
  </style>
</head>
<body class="antialiased">
  <div id="app"></div>
</body>
</html>
