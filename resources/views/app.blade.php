<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Unplugged</title>
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <script src="https://kit.fontawesome.com/22cfd32714.js" crossorigin="anonymous"></script>
        <script defer src="{{ asset('js/app.js?v1') }}"></script>
    </head>
    <body class="antialiased">
        <header>
            <div id="backButtonWrapper"></div>
            <span id="title"></span>
            <i class="fa fa-bell"></i>
        </header>
        <main>
            <section id="welcome">
                <img class="logo" src="{{ asset('images/logo.PNG') }}">
            </section>
            <section id="alert" class=""></section>
            <template id="alertTemplate">
                <i class="fa"></i>
                <p class="message"></p>
                <span class="date"></span>
            </template>
            <section id="recordTileWrapper" class="none"></section>
            <template id="recordTileTemplate">
                <div>
                    <label></label>
                    <input type="checkbox">
                </div>
            </template>
        </main>
        <footer>
            <button id="startButton">@if($hasCurrentRecord) Continue @else Start @endif checks <i class="fa fa-arrow-right"></i></button>
            <button id="finishButton" class="hide">Finish checks <i class="fa fa-check-circle"></i></button>
        </footer>
        <aside class="finishModal hide">
            <p>Are you sure you want to complete checks?</p>
            <div>
                <button class="cancelBtn">Cancel</button>
                <button class="finishBtn">Ok</button>
            </div>
        </aside>
    </body>
</html>
