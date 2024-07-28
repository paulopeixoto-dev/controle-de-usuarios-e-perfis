<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // ============= Grupo de Permissões ===========

        DB::table("permgroups")->insert(
            [ "name" => "Admin"]
        );

        DB::table("permgroups")->insert(
            [ "name" => "Usuário Comum"]
        );


        // ============= Itens de Permissões ===========

        DB::table("permitems")->insert(
            [
                "name"             => "Criar Usuário",
                "slug"             => "criar_usuario",
                "group"            => "usuario"
            ]
        );

        DB::table("permitems")->insert(
            [
                "name"             => "Editar Outro Usuário",
                "slug"             => "editar_outro_usuario",
                "group"            => "usuario"
            ]
        );

        DB::table("permitems")->insert(
            [
                "name"             => "Editar Próprio Usuário",
                "slug"             => "editar_proprio_usuario",
                "group"            => "usuario"
            ]
        );

        DB::table("permitems")->insert(
            [
                "name"             => "Visualizar todos usuários",
                "slug"             => "visualizar_todos_usuario",
                "group"            => "usuario"
            ]
        );

        DB::table("permitems")->insert(
            [
                "name"             => "Criar Perfil",
                "slug"             => "criar_perfil",
                "group"            => "perfil"
            ]
        );

        DB::table("permitems")->insert(
            [
                "name"             => "Editar Perfil",
                "slug"             => "editar_perfil",
                "group"            => "perfil"
            ]
        );


        // ============= Link Group com items ===========

        DB::table("permgroup_permitem")->insert(
            [
                "permgroup_id"     => 1,
                "permitem_id"      => 1

            ]
        );

        DB::table("permgroup_permitem")->insert(
            [
                "permgroup_id"     => 1,
                "permitem_id"      => 2

            ]
        );

        DB::table("permgroup_permitem")->insert(
            [
                "permgroup_id"     => 1,
                "permitem_id"      => 3

            ]
        );

        DB::table("permgroup_permitem")->insert(
            [
                "permgroup_id"     => 1,
                "permitem_id"      => 4

            ]
        );

        DB::table("permgroup_permitem")->insert(
            [
                "permgroup_id"     => 1,
                "permitem_id"      => 5

            ]
        );

        DB::table("permgroup_permitem")->insert(
            [
                "permgroup_id"     => 1,
                "permitem_id"      => 6

            ]
        );

        DB::table("permgroup_permitem")->insert(
            [
                "permgroup_id"     => 2,
                "permitem_id"      => 3

            ]
        );


        // ============= Criação de Usuários ===========

        DB::table('users')->insert([
            [
                'name' => 'Admin',
                'user' => 'gs3',
                "permgroup_id"     => 1,
                'password' => Hash::make('veryhappy', ['rounds' => 12]),
            ],
            [
                'name' => 'Usuário Comum',
                'user' => 'usuario_comum',
                "permgroup_id"     => 2,
                'password' => Hash::make('veryhappy', ['rounds' => 12]),
            ]
        ]);


    }
}
