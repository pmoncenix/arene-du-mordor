import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormGroup
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Hero, HERO_MAX_POINTS } from '../../models/hero';
import { Weapon } from '../../models/weapon';
import { HeroService } from '../../services/hero.service';
import { WeaponService } from '../../services/weapon.service';

@Component({
  selector: 'app-hero-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './hero-edit.html',
  styleUrl: './hero-edit.css'
})
export class HeroEdit implements OnInit, OnDestroy {
  heroForm!: FormGroup;

  weapons: Weapon[] = [];
  hero?: Hero;
  isNew = false;

  private sub?: Subscription;

  readonly maxPoints = HERO_MAX_POINTS;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private weaponService: WeaponService
  ) {

    this.heroForm = this.fb.group(
      {
        id: [0],
        name: ['', Validators.required],
        attack: [10, [Validators.required, Validators.min(1)]],
        dodge: [10, [Validators.required, Validators.min(1)]],
        damage: [10, [Validators.required, Validators.min(1)]],
        hp: [10, [Validators.required, Validators.min(1)]],
        weaponId: [null as number | null]
      },
      {
        validators: [this.totalPointsValidator()]
      }
    );
  }

  ngOnInit(): void {
    this.weaponService.getWeapons().subscribe(w => (this.weapons = w));

    this.sub = this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (!idParam || idParam === 'new') {
        this.isNew = true;
        const newId = this.heroService.getNextId();
        this.heroForm.patchValue({ id: newId });
      } else {
        const id = Number(idParam);
        this.isNew = false;
        this.heroService.getHero(id).subscribe(hero => {
          if (hero) {
            this.hero = hero;
            this.heroForm.patchValue({
              id: hero.id,
              name: hero.name,
              attack: hero.attack,
              dodge: hero.dodge,
              damage: hero.damage,
              hp: hero.hp,
              weaponId: hero.weaponId ?? null
            });
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  totalPoints(): number {
    const v = this.heroForm.value;
    const a = v.attack ?? 0;
    const e = v.dodge ?? 0;
    const d = v.damage ?? 0;
    const p = v.hp ?? 0;
    return a + e + d + p;
  }

  remainingPoints(): number {
    return this.maxPoints - this.totalPoints();
  }

  totalPointsValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const a = control.get('attack')?.value ?? 0;
      const e = control.get('dodge')?.value ?? 0;
      const d = control.get('damage')?.value ?? 0;
      const p = control.get('hp')?.value ?? 0;
      const sum = a + e + d + p;
      return sum <= HERO_MAX_POINTS ? null : { totalPoints: { sum } };
    };
  }

  selectedWeapon(): Weapon | undefined {
    const id = this.heroForm.get('weaponId')?.value;
    if (id == null) return undefined;
    return this.weapons.find(w => w.id === id);
  }

  canEquipWeapon(weapon: Weapon | undefined): boolean {
    if (!weapon) return true;
    const v = this.heroForm.value;
    const a = (v.attack ?? 0) + weapon.attack;
    const e = (v.dodge ?? 0) + weapon.dodge;
    const d = (v.damage ?? 0) + weapon.damage;
    const p = (v.hp ?? 0) + weapon.hp;
    return a >= 1 && e >= 1 && d >= 1 && p >= 1;
  }

  weaponWouldBreakConstraint(): boolean {
    const weapon = this.selectedWeapon();
    if (!weapon) return false;
    return !this.canEquipWeapon(weapon);
  }

  save(): void {
    if (this.heroForm.invalid || this.weaponWouldBreakConstraint()) {
      this.heroForm.markAllAsTouched();
      return;
    }

    const v = this.heroForm.value;
    const hero = new Hero(
      v.id ?? this.heroService.getNextId(),
      v.name ?? '',
      v.attack ?? 1,
      v.dodge ?? 1,
      v.damage ?? 1,
      v.hp ?? 1,
      v.weaponId ?? null
    );

    if (this.isNew) {
      this.heroService.addHero(hero);
    } else {
      this.heroService.updateHero(hero);
    }

    this.router.navigate(['/heroes']);
  }

  cancel(): void {
    this.router.navigate(['/heroes']);
  }
}
