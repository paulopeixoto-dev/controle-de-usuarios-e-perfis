import { CanActivateFn } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../services/utils.service';
import { ApiService } from '../service/data.service';

export const authGuard: CanActivateFn = (route, state) => {

  const apiService = inject(ApiService);
  const utilsSvc = inject(UtilsService);

  return new Promise((resolve) => {
    apiService.validateToken().subscribe(
      (response) => {
        resolve(true);
      },
      (error) => {
        utilsSvc.routerLink('/auth');
        resolve(false);
      }
    );
  });

};
