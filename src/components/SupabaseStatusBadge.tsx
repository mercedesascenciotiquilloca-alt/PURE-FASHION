import React, { useState } from 'react';
import { Database, CheckCircle2, AlertCircle, RefreshCw, Copy, Check, ExternalLink } from 'lucide-react';
import { useStoreData } from '../context/StoreDataContext';
import { SUPABASE_SCHEMA_SQL, SUPABASE_URL } from '../utils/supabase';

export const SupabaseStatusBadge: React.FC = () => {
  const { isSupabaseConnected, isSyncing, syncResult, syncAllToSupabase, products, databaseProjectId } = useStoreData();
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full border transition-all hover:opacity-90"
        style={{
          backgroundColor: isSupabaseConnected ? '#E6F4EA' : '#FEF3D6',
          borderColor: isSupabaseConnected ? '#34A853' : '#F9AB00',
          color: isSupabaseConnected ? '#137333' : '#B06000',
        }}
        title="Estado de conexión con Supabase"
        aria-label="Estado de conexión con Supabase"
      >
        <Database className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden sm:inline">
          {isSupabaseConnected ? 'Supabase Conectado' : 'Supabase Configurado'}
        </span>
        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: isSupabaseConnected ? '#34A853' : '#F9AB00' }} />
      </button>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FFF9F5] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#F8DCE8] relative max-h-[90vh] overflow-y-auto text-[#29232A]">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#F8DCE8]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#3ECF8E]/20 text-[#24b47e] rounded-2xl">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-[#29232A]">
                    Base de Datos Supabase · PURÉ FASHION
                  </h3>
                  <p className="text-xs text-[#76518F]">
                    Proyecto ID: <strong className="font-mono">{databaseProjectId}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-[#F8DCE8]/50"
              >
                ✕
              </button>
            </div>

            <div className="py-5 space-y-4 text-xs sm:text-sm">
              <div className="p-4 bg-white rounded-2xl border border-[#F8DCE8] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Estado de sincronización:</span>
                  <span className={`inline-flex items-center gap-1.5 font-bold ${isSupabaseConnected ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {isSupabaseConnected ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {isSupabaseConnected ? 'Conectado y Operativo' : 'Credenciales Listas'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>URL Supabase:</span>
                  <span className="truncate max-w-[240px]">{SUPABASE_URL}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Prendas en tienda:</span>
                  <strong className="text-[#29232A] font-mono">{products.length} productos</strong>
                </div>
              </div>

              {/* Quick Config / Override */}
              <div className="p-4 bg-white rounded-2xl border border-[#F8DCE8] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#76518F] text-xs uppercase tracking-wider">
                    Credenciales del Proyecto PURE-FASHION
                  </h4>
                  <span className="text-[10px] text-slate-400">Configuración activa</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Project URL de Supabase:
                    </label>
                    <input
                      type="text"
                      defaultValue={SUPABASE_URL}
                      id="supabase-url-input"
                      className="w-full px-3 py-1.5 text-xs font-mono bg-[#FFF9F5] border border-[#F8DCE8] rounded-xl text-[#29232A] focus:outline-hidden focus:border-[#C65A86]"
                      placeholder="https://tu-project-id.supabase.co"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Publishable / Anon API Key:
                    </label>
                    <input
                      type="text"
                      defaultValue="sb_publishable_G4c0sBF919z0B_zw6duPtA_CibbRBzQ"
                      id="supabase-key-input"
                      className="w-full px-3 py-1.5 text-xs font-mono bg-[#FFF9F5] border border-[#F8DCE8] rounded-xl text-[#29232A] focus:outline-hidden focus:border-[#C65A86]"
                      placeholder="sb_publishable_... o eyJ..."
                    />
                  </div>
                </div>
              </div>

              {syncResult && (
                <div className={`p-3.5 rounded-2xl border text-xs flex items-start gap-2.5 ${syncResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'}`}>
                  {syncResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />}
                  <div>
                    <p className="font-bold">{syncResult.success ? '¡Sincronización Exitosa!' : 'Atención con las tablas de Supabase'}</p>
                    <p className="mt-0.5 leading-relaxed">{syncResult.message}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-1">
                <h4 className="font-bold text-[#76518F] text-xs uppercase tracking-wider">
                  Acción de Guardado y Sincronización
                </h4>
                <p className="text-xs text-[#29232A]/70 leading-relaxed">
                  Presiona el botón para sincronizar todas las 26 prendas y 10 categorías con tu proyecto de Supabase.
                </p>

                <button
                  onClick={syncAllToSupabase}
                  disabled={isSyncing}
                  className="w-full py-3 px-4 bg-[#3ECF8E] hover:bg-[#34b27b] text-slate-900 font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Guardando en Supabase...' : 'Guardar y Sincronizar Tienda en Supabase Ahora'}</span>
                </button>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#F8DCE8]">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#76518F] text-xs uppercase tracking-wider">
                    Tablas de Supabase (SQL Editor)
                  </h4>
                  <button
                    onClick={handleCopySql}
                    className="inline-flex items-center gap-1 text-xs text-[#C65A86] font-semibold hover:underline"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? '¡Copiado!' : 'Copiar Script SQL'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-[#29232A]/60 leading-relaxed">
                  Si tu base de datos en Supabase es nueva, ejecuta este script en el <strong>SQL Editor</strong> de tu panel de Supabase para crear las tablas (<code className="bg-slate-100 px-1 py-0.5 rounded">products</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">categories</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">orders</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">inquiries</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">newsletter</code>) con políticas de lectura y escritura abiertas.
                </p>
                <div className="relative">
                  <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[10px] font-mono max-h-36 overflow-y-auto leading-relaxed">
                    {SUPABASE_SCHEMA_SQL}
                  </pre>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href={`https://supabase.com/dashboard/project/${databaseProjectId}/editor`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#3ECF8E] hover:underline font-semibold"
                >
                  <span>Abrir panel de Supabase</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-[#29232A] rounded-xl text-xs font-semibold"
                >
                  Cerrar
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
