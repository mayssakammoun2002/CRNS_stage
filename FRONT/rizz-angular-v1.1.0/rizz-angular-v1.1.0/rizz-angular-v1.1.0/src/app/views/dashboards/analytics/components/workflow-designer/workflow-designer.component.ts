import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as joint from 'jointjs/dist/joint';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workflow-designer',
  templateUrl: './workflow-designer.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  styleUrls: ['./workflow-designer.component.css']
})
export class WorkflowDesignerComponent implements AfterViewInit {
  @ViewChild('paperContainer', { static: false }) paperContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('editElementModal', { static: false }) editElementModal!: any;
  @ViewChild('addCustomStepModal', { static: false }) addCustomStepModal!: any;

  private graph!: joint.dia.Graph;
  private paper!: joint.dia.Paper;
  selectedElement: joint.dia.Element | null = null;
  selectedElementView: joint.dia.ElementView | null = null;
  isAssignMode = false;
  elementCount = 0;

  elementForm!: FormGroup;
  customStepForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  ngAfterViewInit(): void {
    this.initializeWorkflow();
    this.setupPaperEvents();
  }

  private initializeForms(): void {
    this.elementForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.customStepForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  private initializeWorkflow(): void {
    if (!this.paperContainer?.nativeElement) {
      console.error('paperContainer is not initialized.');
      return;
    }
    this.graph = new joint.dia.Graph();
    this.paper = new joint.dia.Paper({
      el: this.paperContainer.nativeElement,
      model: this.graph,
      width: '100%',
      height: 600,
      gridSize: 10,
      drawGrid: true,
      background: { color: '#f0f0f0' },
      interactive: true,
    });
  }

  private setupPaperEvents(): void {
    this.paper.on('element:pointerclick', (elementView: joint.dia.ElementView) => {
      // @ts-ignore
      this.selectedElement = elementView.model as joint.dia.Element;
      this.selectedElementView = elementView;
      this.elementForm.patchValue({ name: this.selectedElement.attr('label/text').replace(/^\d+\.\s*/, '') || '' });
    });
  }

  onDragStart(event: DragEvent, type: string): void {
    event.dataTransfer?.setData('elementType', type);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const elementType = event.dataTransfer?.getData('elementType');
    if (!elementType || !['upload', 'ocr', 'classification', 'custom'].includes(elementType)) return;
    const x = event.offsetX;
    const y = event.offsetY;
    if (elementType === 'custom') {
      this.modalService.open(this.addCustomStepModal, { centered: true });
    } else {
      this.addElementToGraph(elementType, x, y);
    }
  }

  addElementToGraph(type: string, x: number, y: number): void {
    this.elementCount++;
    const element = new joint.shapes.standard.Rectangle();
    element.position(x, y);
    element.size(150, 70);
    const text = `${this.elementCount}. ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    const color = type === 'upload' ? '#3498db' : type === 'ocr' ? '#e67e22' : '#2ecc71';
    element.attr({
      body: {
        fill: color,
        stroke: '#333',
        strokeWidth: 2,
        rx: 10,
        ry: 10
      },
      label: {
        text,
        fill: '#fff',
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: 'bold'
      }
    });
    element.prop('elementType', type);
    element.prop('order', this.elementCount);
    this.graph.addCell(element);
  }

  addCustomStep(): void {
    if (this.customStepForm.invalid) return;
    const name = this.customStepForm.value.name;
    this.elementCount++;
    const element = new joint.shapes.standard.Rectangle();
    element.position(50 + (this.elementCount - 1) * 200, 200); // Position par défaut
    element.size(150, 70);
    const text = `${this.elementCount}. ${name}`;
    element.attr({
      body: {
        fill: '#9b59b6', // Couleur pour les étapes personnalisées
        stroke: '#333',
        strokeWidth: 2,
        rx: 10,
        ry: 10
      },
      label: {
        text,
        fill: '#fff',
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: 'bold'
      }
    });
    element.prop('elementType', 'custom');
    element.prop('order', this.elementCount);
    this.graph.addCell(element);
    this.modalService.dismissAll();
    this.customStepForm.reset();
  }

  openEditModal(): void {
    if (this.selectedElement) {
      this.modalService.open(this.editElementModal, { centered: true });
    }
  }

  saveElement(): void {
    if (this.elementForm.invalid || !this.selectedElement) return;
    const order = this.selectedElement.prop('order');
    this.selectedElement.attr('label/text', `${order}. ${this.elementForm.value.name}`);
    this.modalService.dismissAll();
  }

  deleteElement(): void {
    if (this.selectedElement) {
      this.graph.removeCells(this.graph.getConnectedLinks(this.selectedElement));
      this.selectedElement.remove();
      this.selectedElement = null;
      this.selectedElementView = null;
      this.reorderElements();
    }
  }

  enableAssignMode(): void {
    this.isAssignMode = true;
    this.selectedElement = null;
  }

  createLink(): void {
    if (!this.isAssignMode || !this.selectedElement) {
      this.isAssignMode = false;
      return;
    }

    const targetElement = this.graph.getCells().find(cell => cell !== this.selectedElement && cell.prop('elementType'));
    if (targetElement) {
      const sourceOrder = this.selectedElement.prop('order');
      const targetOrder = targetElement.prop('order');
      if (sourceOrder < targetOrder) {
        const link = new joint.shapes.standard.Link();
        link.source(this.selectedElement);
        link.target(targetElement);
        link.attr({
          line: { stroke: '#333', strokeWidth: 2 },
          'line/targetMarker': { type: 'path', d: 'M 10 -5 0 0 10 5 Z' }
        });
        this.graph.addCell(link);
      }
    }

    this.isAssignMode = false;
    this.selectedElement = null;
  }

  navigateToPage(): void {
    if (!this.selectedElement) return;
    const type = this.selectedElement.prop('elementType');
    const routes: { [key: string]: string } = {
      upload: '/upload',
      ocr: '/ocr',
      classification: '/classification',
      custom: '/custom' // Route par défaut pour les étapes personnalisées
    };
    this.router.navigate([routes[type] || '/']);
  }

  private reorderElements(): void {
    const elements = this.graph.getElements().sort((a, b) => (a.prop('order') || 0) - (b.prop('order') || 0));
    elements.forEach((element, index) => {
      element.prop('order', index + 1);
      const type = element.prop('elementType');
      const text = element.attr('label/text') || '';
      const name = text.replace(/^\d+\.\s*/, '');
      element.attr('label/text', `${index + 1}. ${name}`);
    });
    this.elementCount = elements.length;
  }
}
