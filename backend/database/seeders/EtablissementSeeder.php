<?php

namespace Database\Seeders;

use App\Models\Etablissement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EtablissementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        Etablissement::create([
            'nom' => 'Pédiatre Centre',
            'type' => 'pediatre',
            'adresse' => 'Centre-ville',
            'telephone' => '0523004590',
            'ville' => 'Beni Mellal',
        ]);

        Etablissement::create([
            'nom' => 'Cabinet Pédiatrique',
            'type' => 'pediatre',
            'adresse' => 'Quartier Al Massira',
            'telephone' => '0523000002',
            'ville' => 'Beni Mellal',
        ]);

        Etablissement::create([
            'nom' => 'Service des Urgences',
            'type' => 'urgence',
            'adresse' => 'Centre-ville',
            'telephone' => '0523000003',
            'ville' => 'Beni Mellal',
        ]);
    }


    }

