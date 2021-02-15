<?php

function obtenerServicios(): array
{

    try {
        require 'includes/database.php';

        $db->set_charset("utf8");
        $sql = "SELECT * FROM servicios";
        $consulta = mysqli_query($db, $sql);



        $i = 0;
        $servicios = [];
        while ($row = mysqli_fetch_assoc($consulta)) {
            $servicios[$i]['id'] = $row['id'];
            $servicios[$i]['nombre'] = $row['nombre'];
            $servicios[$i]['precio'] = $row['precio'];
            $i++;
        }

        return $servicios;
    } catch (\Throwable $th) {
        //throw $th;

        var_dump($th);
    }
}
