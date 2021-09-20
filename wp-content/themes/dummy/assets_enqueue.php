<?php

// TODO: map + css + img
function enqueue_files()
{
echo '<span class="icon-close-line"></span>';

  $dirJS = new DirectoryIterator(get_stylesheet_directory() . '/seduco-core/dist');
  foreach ($dirJS as $file) {

    if (pathinfo($file, PATHINFO_EXTENSION) === 'js') {
      $fullName = basename($file);    // main.3hZ9.js
      $name = substr(basename($fullName), 0, strpos(basename($fullName), '.')); // main
      switch ($name) {

        case 'main':
          $deps = array('jquery', 'runtime');
          break;

        default:
          $deps = array('jquery');
          break;
      }
      // echo $fullName . '<br>';
      // echo $name;
      // echo get_template_directory_uri() . '/seduco-core/dist/' . $fullName;
      wp_register_script($name , get_template_directory_uri() . '/seduco-core/dist/' . $fullName, $deps, 1.0, true);
      wp_enqueue_script($name);
      // echo '<br>';
    } else if(pathinfo($file, PATHINFO_EXTENSION) === 'css'){
      $fullName = basename($file);    // main.3hZ9.css
      echo $fullName;
      $name = substr(basename($fullName), 0, strpos(basename($fullName), '.')); // main
      wp_register_style($name, get_stylesheet_directory_uri() . '/seduco-core/dist/' . $fullName);
      wp_enqueue_style($name);
    }
  }
}
