import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export interface Lancamento {
  id: string;
  descricao: string;
  valor: number;
  tipo: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  apiUrl = 'http://localhost:3000/lancamentos'

  entrada = 0;
  saida = 0;
  total = 0;

  lancamentos: Lancamento[] = [];

  descricao = '';
  valor = 0;
  tipo = '';

  lancamentoSelecionadoId: string | null = null;

  showBtnAtualizar: boolean = false;

  constructor(private http: HttpClient, private router: Router, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.getLancamentos();
  }

  getLancamentos() {
    this.http
      .get(this.apiUrl)
      .subscribe((resp: any) => {
        this.lancamentos = resp;
        // console.log(this.lancamentos)
        this.atualizarDados();
      });
  }

  adicionar() {
    if (!this.descricao || this.valor <= 0 || !this.tipo) {
      // alert('Preencha descrição, tipo e valor!');
      this.toastrService.warning('Preencha descrição, tipo e valor!', 'Atenção: ');
      return;
    }
    const novoLancamento = {
      descricao: this.descricao,
      valor: this.valor,
      tipo: this.tipo,
    };

    this.http
      .post(this.apiUrl, novoLancamento)
      .subscribe(() => {
        this.getLancamentos();
      });

    this.descricao = '';
    this.valor = 0;
    this.tipo = '';
  }

  remover(id: string) {
    const confimDelete = confirm('Deseja realmente Excluir Item?');
    if (confimDelete) {
      this.http
        .delete(`${this.apiUrl}/${id}`)
        .subscribe(() => {
          this.getLancamentos();
        });
      }
  }

  atualizarDados() {
    this.entrada = this.lancamentos
      .filter((lancamento) => lancamento.tipo === 'entrada')
      .reduce((somaEntrada, lancamento) => somaEntrada + lancamento.valor, 0);

    this.saida = this.lancamentos
      .filter((lancamento) => lancamento.tipo === 'saida')
      .reduce((somaSaida, lancamento) => somaSaida + lancamento.valor, 0);

    this.total = this.entrada - this.saida;
  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigateByUrl('login');
  }

  edit(lancamento: Lancamento){
    this.lancamentoSelecionadoId = lancamento.id;
    this.descricao = lancamento.descricao;
    this.valor = lancamento.valor;
    this.tipo = lancamento.tipo;
    this.showBtnAtualizar = true;
  }

  atualizarLancamento() {
    if (this.lancamentoSelecionadoId === null) return;

    const novoLancamento = {
      id: this.lancamentoSelecionadoId,
      descricao: this.descricao,
      valor: this.valor,
      tipo: this.tipo,
    }
   this.http.put(`${this.apiUrl}/${this.lancamentoSelecionadoId}`, novoLancamento)
    .subscribe((resp: any) => {
      this.getLancamentos();
      this.resetarFormulario(); 
    });

    this.showBtnAtualizar = false;
  }

  resetarFormulario() {
    this.descricao = '';
    this.valor = 0;
    this.tipo = '';
    this.lancamentoSelecionadoId = null;
  }

  cancelarEdit() {
    this.showBtnAtualizar = false;
    this.resetarFormulario();
  }
}
