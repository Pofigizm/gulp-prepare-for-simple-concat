# gulp-prepare-for-simple-concat
Preparing source maps for simple concatenation.

Add this as last operations in your gulp task.
Each map file will have reverse instruction in `mappings` field and unnecessary empty file in `sources` and `sourcesContent` fields.
That's why you can simple join `mappings` fields with ';;' in the middle and push it with  first elements of `sources` and `sourcesContent` fields into result map file.
You also need add empty files into `sources` and `sourcesContent` fields of result map file to prevent error from reverse instruction in last file.

Sorry for my agly english ))
