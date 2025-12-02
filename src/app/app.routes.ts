import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { HeroList } from './components/hero-list/hero-list';
import { HeroEdit } from './components/hero-edit/hero-edit';
import { WeaponList } from './components/weapon-list/weapon-list';
import { WeaponEdit } from './components/weapon-edit/weapon-edit';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },

  { path: 'heroes', component: HeroList },
  { path: 'heroes/new', component: HeroEdit },
  { path: 'heroes/:id', component: HeroEdit },

  { path: 'weapons', component: WeaponList },
  { path: 'weapons/new', component: WeaponEdit },
  { path: 'weapons/:id', component: WeaponEdit },

  { path: '**', redirectTo: '/dashboard' }
];
