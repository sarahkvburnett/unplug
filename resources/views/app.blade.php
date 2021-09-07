<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Unplug</title>
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <script defer src="{{ asset('js/app.js?v1') }}"></script>
    </head>
    <body class="antialiased">
        <header>
            <button id="backButton">Back</button>
            <h1>Unplug</h1>
            <button id="finishButton">Finish</button>
        </header>
        <main>
            <section id="recordTileWrapper">

            </section>
            <template id="recordTileTemplate">
                <div>
                    <label></label>
                    <input type="checkbox">
                </div>
            </template>
        </main>
        <footer>
            <button id="startButton">@if($hasCurrentRecord) Continue @else Start @endif </button>
        </footer>
    </body>
</html>
