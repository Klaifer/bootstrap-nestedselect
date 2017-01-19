# bootstrap-nestedselect

## [View the demo](http://klaifer.github.io/bootstrap-nestedselect/)

## Installation
To install, simply copy the files to your project.

## Usage

### Minimum Setup
```
	<div id="ns"></div>
    <script type="text/javascript">
        $(function () {
        	data = //... your json object ...
            $('#ns').datetimepicker(data);
        });
    </script>

```

### Posting Selection
To post the selection with the form, add an input to hold selection.
```
	<div id="ns">
	    <input type="hidden" name="breadcrubs" />
	</div>
    <script type="text/javascript">
        $(function () {
        	data = //... your json object ...
            $('#ns').datetimepicker(data);
        });
    </script>

```

### Avaliable methods

#### getbreadcrumbs
Return the selected values

```
	<div id="ns"></div>
	<button type="button" id="btncrub">Log Breadcrumbs</button>
    <script type="text/javascript">
        $(function () {
        	data = //... your json object ...
            $('#ns').datetimepicker(data);
        });
        $("#btncrub").click(function () {
            console.log($("#ns").getbreadcrumbs());
        });
    </script>

```

#### getbreadcrumbs
Return the last selected value

```
	<div id="ns"></div>
	<button type="button" id="btncrub">Log Breadcrumbs</button>
    <script type="text/javascript">
        $(function () {
        	data = //... your json object ...
            $('#ns').datetimepicker(data);
        });
        $("#btncrub").click(function () {
            console.log($("#ns").lastselected());
        });
    </script>

```