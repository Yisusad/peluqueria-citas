<?php

$db = mysqli_connect('localhost', 'root', '', 'dbappsalon');

if(!$db) {
    echo "Error de conexión";
    exit;
}